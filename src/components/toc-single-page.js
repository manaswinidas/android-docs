/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mapbox/react-icon';
import { getCategoriesForProduct } from '../util/get-categories-for-product';
import listExamples from '@mapbox/batfish/data/list-examples';
import { RelatedHelpPages } from '../data/related-help-pages.js';
import { prefixUrl } from '@mapbox/batfish/modules/prefix-url';

class TocSinglePage extends React.PureComponent {
  static propTypes = {
    product: PropTypes.string.isRequired,
    sidebarContent: PropTypes.shape({
      firstLevelToc: PropTypes.array,
      secondLevelToc: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          topic: PropTypes.string.isRequired
        })
      )
    }).isRequired
  };

  buildList(categories, itemsByCategory) {
    const contents = categories.map((category, index) => {
      const listItems = itemsByCategory[index].map(item => {
        return (
          <li
            key={item.path}
            className="mt6 txt-s"
            style={{ listStyle: 'none' }}
          >
            <a
              href={item.path}
              className="color-blue-on-hover text-decoration-none unprose"
            >
              {item.title}
            </a>
          </li>
        );
      });
      return (
        <div key={index} className="mb24 ml12">
          <a href={category.path} className="txt-m">
            {category.title} ({itemsByCategory[index].length})
          </a>
          <ul>{listItems}</ul>
        </div>
      );
    });
    return contents;
  }
  renderTocContents() {
    if (/\/examples\/+./.test(this.props.currentPath)) {
      return (
        <a
          href={prefixUrl(`${this.props.product}/examples/`)}
          className="unprose txt-m color-blue-on-hover"
        >
          <Icon name="arrow-left" inline={true} /> Back to all examples
        </a>
      );
    } else if (/\/examples\W/.test(this.props.currentPath)) {
      const examplesByProduct = listExamples.filter(example => {
        return example.path.indexOf(this.props.product) > -1;
      });
      let exampleCategories = getCategoriesForProduct(examplesByProduct).filter(
        category => {
          return category.title !== 'Getting started';
        }
      );
      exampleCategories.unshift({
        title: 'Getting started',
        path: '#getting-started'
      });
      const examplesByCategory = exampleCategories.map(category => {
        const examplesLists = examplesByProduct.filter(example => {
          return example.topic === category.title;
        });
        return examplesLists;
      });
      return this.buildList(exampleCategories, examplesByCategory);
    } else if (/\/help\W/.test(this.props.currentPath)) {
      const guideCategories = RelatedHelpPages.map(category => {
        return {
          title: category.title,
          path: `#${category.path}`
        };
      });
      const guidesByCategory = RelatedHelpPages.map(category => {
        const guidesByProduct = category.guides.filter(guide => {
          return guide.products.indexOf(this.props.product) > -1;
        });
        return guidesByProduct;
      });
      return this.buildList(guideCategories, guidesByCategory);
    }
  }

  render() {
    let tocContent = null;
    tocContent = this.renderTocContents();

    return (
      <div>
        <div className="block-mm none pl24 pr12">{tocContent}</div>
      </div>
    );
  }
}

export { TocSinglePage };
