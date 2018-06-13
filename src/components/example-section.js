import React from 'react';
import PropTypes from 'prop-types';
import { ExampleCard } from './example-card';

class ExampleSection extends React.PureComponent {
  static propTypes = {
    category: PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    }).isRequired,
    examples: PropTypes.array.isRequired
  };

  render() {
    const categoryID = this.props.category.path.split('#')[1];
    const allExampleCards = this.props.examples.map((example, index) => {
      return (
        <ExampleCard
          key={index}
          exampleTitle={example.title}
          exampleUrl={example.path}
          exampleDescription={example.description}
          exampleThumbnail={example.thumbnail}
        />
      );
    });
    return (
      <div>
        <a
          href={`${this.props.category.path}`}
          className="unprose mb12 block color-blue-on-hover"
        >
          <h2 className="pt60 txt-l txt-capitalize-first" id={categoryID}>
            {this.props.category.title} ({this.props.examples.length})
          </h2>
        </a>
        <div className="grid grid--gut12 card-container">{allExampleCards}</div>
      </div>
    );
  }
}

export { ExampleSection };
