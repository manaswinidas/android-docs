import React from 'react';
import PropTypes from 'prop-types';
import AppropriateImage from './appropriate-image';

class SideBySideComparison extends React.PureComponent {
  static propTypes = {
    imageOne: PropTypes.string.isRequired,
    captionOne: PropTypes.string,
    imageTwo: PropTypes.string.isRequired,
    captionTwo: PropTypes.string
  };

  render() {
    const captionClasses = 'align-center color-gray my12';
    return (
      <div className="grid grid--gut36 my24">
        <div className="col col--6-mm col--12 align-center">
          <AppropriateImage imageId={this.props.imageOne} />
          <div className={captionClasses}>{this.props.captionOne}</div>
        </div>
        <div className="col col--6-mm col--12 align-center">
          <AppropriateImage imageId={this.props.imageTwo} />
          <div className={captionClasses}>{this.props.captionTwo}</div>
        </div>
      </div>
    );
  }
}

export { SideBySideComparison };
