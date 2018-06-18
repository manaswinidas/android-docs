import React from 'react';
import PropTypes from 'prop-types';
import AppropriateImage from './appropriate-image';
import classnames from 'classnames';

class VideoWithDeviceFrame extends React.Component {
  static propTypes = {
    videoFile: PropTypes.any,
    rotation: PropTypes.oneOf(['horizontal', 'vertical']),
    device: PropTypes.oneOf(['pixel-2'])
  };

  render() {
    const frameHorizontalCustomStyles = {
      padding: '0 1%'
    };
    let imageId = '';
    if (this.props.rotation === 'vertical') {
      imageId = 'pixel2FrameVertical';
    } else {
      imageId = 'pixel2FrameHorizontal';
    }
    const videoClasses = classnames('block mx-auto  ', {
      'pt90 px12 w300 pb120':
        this.props.rotation === 'vertical' && this.props.device === 'pixel-2',
      'w600-mxl px84-mxl pt15-mxl w480-ml px60-ml pt12-ml w360 px48 pt6 pb60':
        this.props.rotation === 'horizontal' && this.props.device === 'pixel-2'
    });
    const frameClasses = classnames('mt0', {
      'pt12 w360': this.props.rotation === 'vertical',
      'w600-mxl w480-ml w360': this.props.rotation === 'horizontal'
    });

    return (
      <div className="relative">
        <div className="top left right align-center absolute">
          <AppropriateImage
            className={frameClasses}
            style={frameHorizontalCustomStyles}
            imageId={imageId}
          />
        </div>
        <video
          autoPlay
          loop
          width="100%"
          className={videoClasses}
          src={this.props.videoFile}
          type="video/mp4"
        />
      </div>
    );
  }
}

export { VideoWithDeviceFrame };
