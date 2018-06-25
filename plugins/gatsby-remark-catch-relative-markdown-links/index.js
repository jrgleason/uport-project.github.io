const visit = require('unist-util-visit');
const isRelativeUrl = require('is-relative-url');
const grayMatter = require('gray-matter');
const _ = require('lodash');

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'link', node => {
    if (node.url && isRelativeUrl(node.url)) {
      // convert frontmatter to YAML so grayMatter can read.
      const data = markdownAST.children[0].value
      if(data) grayMatter(`---\n${data.toString()}\n---\n`);
      // TODO https://eslint.org/docs/rules/no-param-reassign
      node.url = _.replace(node.url, '../', '/');
      node.url = _.replace(node.url, '.md', '');
      node.url = _.replace(node.url, './', '');
    }
  });

  return markdownAST;
};
