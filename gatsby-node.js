const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const gql =`
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          category
          type
        }
        fields {
          slug
        }
      }
    }
  }
}
`
const contentPage = path.resolve("src/templates/content.jsx");
const categoryPage = path.resolve("src/templates/category.jsx");
const eachEdge = (edge, createPage)=>{
   if (edge.node.frontmatter.category) return edge.node.frontmatter.category;
   if (edge.node.frontmatter.type === 'content') {
     createPage({
       path: edge.node.fields.slug,
       component: contentPage,
       context: {
         slug: edge.node.fields.slug
       }
     });
   }
   return null
}
const afterGQL = (result, createPage) => new Promise((resolve, reject) => {
    if (result.errors) return reject(result.errors);
    return resolve(result.data
          .allMarkdownRemark
          .edges
          .map(edge => eachEdge(edge, createPage))
          .filter(edge => edge != null)
          .filter((v, i, a) => a.indexOf(v) === i)
          .forEach(category => {
            createPage({
              path: `/categories/${_.kebabCase(category)}/`,
              component: categoryPage,
              context: {
                category
              }
             });
          })
    );
})

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  const {createNodeField} = boundActionCreators;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    const dir = `${_.replace(parsedFilePath.dir, 'public', '')}`;
    const name = `${_.trim(_.toLower(parsedFilePath.name))}`;
    slug = `${dir}/${name}`;
    createNodeField({node, name: "slug", value: slug});
  }
};



exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  graphql(gql).then(result => afterGQL(result, createPage))
};

exports.modifyWebpackConfig = ({config, stage}) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
