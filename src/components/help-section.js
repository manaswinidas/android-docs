import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mapbox/react-icon';

class HelpSection extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    guides: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        products: PropTypes.array.isRequired
      }).isRequired
    ).isRequired,
    product: PropTypes.string.isRequired
  };

  render() {
    const currentProduct = this.props.product;
    const allGuides = this.props.guides
      .filter(guide => {
        return guide.products.indexOf(currentProduct) > -1;
      })
      .map((guide, index) => {
        return (
          <a
            key={index}
            href={guide.path}
            className="unprose block shadow-darken10-on-hover color-blue-on-hover my12 round cursor-pointer px18 py12"
          >
            <div className="flex-parent flex-parent--center-cross">
              <div className="txt-l flex-child">{guide.title}</div>
              <Icon
                name="share"
                className="flex-child flex-child--no-shrink icon color-gray-light h24 w24 ml6"
              />
            </div>

            <div className="color-gray">{guide.description}</div>
          </a>
        );
      });
    return (
      <div>
        <a
          href={`#${this.props.path}`}
          className="unprose mt36 mb12 block color-blue-on-hover"
        >
          <h2 id={this.props.path}>{this.props.title}</h2>
        </a>
        <div className="color-gray txt-l">{this.props.description}</div>
        {allGuides}
      </div>
    );
  }
}

export { HelpSection };
