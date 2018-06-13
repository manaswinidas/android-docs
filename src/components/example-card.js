import React from 'react';
import PropTypes from 'prop-types';
import AppropriateImage from './appropriate-image';

class ExampleCard extends React.Component {
  static propTypes = {
    exampleTitle: PropTypes.string.isRequired,
    exampleUrl: PropTypes.string.isRequired,
    exampleDescription: PropTypes.string.isRequired,
    exampleThumbnail: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="col col--6-mm col--12 mb24">
        <a
          className="color-gray-dark transition shadow-darken10-on-hover round clip inline-block w-full px12 py12 unprose"
          href={this.props.exampleUrl}
          style={{ verticalAlign: 'top' }}
        >
          <div className="relative h120 mb12">
            <AppropriateImage
              backgroundSize="100% auto"
              imageId={this.props.exampleThumbnail}
              background={true}
            />
          </div>
          <div className="px6 pb6">
            <div className="mb6 txt-m">{this.props.exampleTitle}</div>
            <div className="txt-s color-gray">
              {this.props.exampleDescription}
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export { ExampleCard };
