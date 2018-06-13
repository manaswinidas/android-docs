import React from 'react';
import PropTypes from 'prop-types';
import { OverviewHeader } from './overview-header';

export default class OverviewGuide extends React.Component {
  static propTypes = {
    productProper: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    overviewHeaderProps: PropTypes.shape({
      changelogLink: PropTypes.string.isRequired,
      ghLink: PropTypes.string.isRequired,
      imageId: PropTypes.string.isRequired,
      sdkFeatures: PropTypes.array.isRequired,
      versionConstant: PropTypes.string.isRequired,
      installLink: PropTypes.string.isRequired
    }),
    content: PropTypes.node.isRequired
  };

  render() {
    let overviewHeader = null;
    if (this.props.overviewHeaderProps) {
      overviewHeader = (
        <div className="mb36">
          <OverviewHeader
            {...this.props.overviewHeaderProps}
            productName={`Mapbox ${this.props.productProper} SDK for ${
              this.props.platform
            }`}
          />
        </div>
      );
    }
    return (
      <div className="prose">
        {overviewHeader}
        {this.props.content}
      </div>
    );
  }
}
