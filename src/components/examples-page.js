import React from 'react';
import PropTypes from 'prop-types';
import { ExampleSection } from './example-section';
import PageShell from './page-shell';
import { getCategoriesForProduct } from '../util/get-categories-for-product';
import listExamples from '@mapbox/batfish/data/list-examples';

class ExamplesPage extends React.PureComponent {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const examplesByProduct = listExamples.filter(example => {
      return example.path.indexOf(this.props.frontMatter.product) > -1;
    });
    const uniqueCategories = getCategoriesForProduct(examplesByProduct);
    const exampleSections = uniqueCategories.map((category, index) => {
      const examplesByCategory = examplesByProduct.filter(example => {
        return example.topic === category.title;
      });
      return (
        <ExampleSection
          key={index}
          category={category}
          examples={examplesByCategory}
        />
      );
    });
    return (
      <PageShell frontMatter={this.props.frontMatter}>
        {exampleSections}
      </PageShell>
    );
  }
}

export default ExamplesPage;
