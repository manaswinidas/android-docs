'use strict';

const visit = require('unist-util-visit');
const h = require('hastscript');

module.exports = () => {
  return transformer;

  function transformer(tree) {
    visit(tree, 'element', visitor);
  }

  function visitor(node, index, parent) {
    if (node.tagName && node.tagName === 'table') {
      parent.children[index] = h('div.scroll-auto', node);
    }
  }
};
