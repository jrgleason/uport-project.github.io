const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

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

  /* add new types of pages for programatic creation here */
  return new Promise((resolve, reject) => {
    const contentPage = path.resolve("src/templates/content.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");
    resolve(
      graphql(
        `
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
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }
        const categorySet = new Set();
        result.data.allMarkdownRemark.edges.forEach(edge => {

          if (edge.node.frontmatter.category) {
            categorySet.add(edge.node.frontmatter.category);
          }
          if (edge.node.frontmatter.type === 'content') {
            createPage({
              path: edge.node.fields.slug,
              component: contentPage,
              context: {
                slug: edge.node.fields.slug
              }
            });
          }

        });
        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });
      })
    );
  });
};

exports.modifyWebpackConfig = ({config, stage}) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
