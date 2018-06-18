import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mapbox/react-icon';
import AppropriateImage from './appropriate-image';
import * as constants from '../constants';

export class OverviewHeader extends React.PureComponent {
  static propTypes = {
    productName: PropTypes.string.isRequired
  };

  render() {
    const featuresList = this.props.sdkFeatures.map((feature, index) => {
      return (
        <li key={index} className="ml-neg24">
          <Icon name="check" inline={true} themeIcon="color-gray-light" />{' '}
          {feature}
        </li>
      );
    });
    let version = null;
    if (this.props.versionConstant) {
      version = (
        <p>
          Current version: v{constants[this.props.versionConstant]}{' '}
          <a href={this.props.changelogLink}>View changelog</a>
        </p>
      );
    }
    return (
      <div className="scroll-hidden mt12 wmax960 relative border-b border--gray-light">
        <h1 className="mb6 txt-fancy">{this.props.productName}</h1>
        <div className="flex-parent flex-parent--space-between-main">
          <div className="flex-child mr240-ml mr0">
            {version}
            <ul className="mb24" style={{ listStyle: 'none' }}>
              {featuresList}
            </ul>
            <div className="mb24">
              <a
                href={this.props.installLink}
                className="btn txt-l round inline-block color-white unprose"
              >
                Install
              </a>
              <a
                href={this.props.ghLink}
                className="inline-block ml24 unprose link"
              >
                <Icon name="github" inline={true} /> Contribute on GitHub
              </a>
            </div>
          </div>
          <div className="flex-child">
            <AppropriateImage
              imageId={this.props.imageId}
              className="absolute right w240 block-ml none"
            />
          </div>
        </div>
      </div>
    );
  }
}
