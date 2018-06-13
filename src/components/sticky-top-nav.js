import React from 'react';
import PropTypes from 'prop-types';
import Sticky from 'react-stickynode';
import _ from 'lodash';

class StickyTopNav extends React.PureComponent {
  static propTypes = {
    currentPath: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    width: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      isStuck: false,
      bottomBoundaryValue: 0
    };
  }

  componentDidMount() {
    this.throttledHandleWindowResize();
    window.addEventListener('resize', this.throttledHandleWindowResize);
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.throttledHandleWindowResize);
  }

  throttledHandleWindowResize = _.throttle(() => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    this.setState({
      isStuck: width > 640,
      bottomBoundaryValue: height - 400
    });
  }, 200);

  render() {
    return (
      <Sticky
        ref="topNav"
        enabled={this.state.isStuck}
        top={0}
        bottomBoundary={this.state.bottomBoundaryValue}
        innerZ={2}
      >
        <div
          ref="stickyNav"
          id="sticky-nav"
          className="border-t border-b border--gray-light pt12 bg-white w-full"
        >
          {this.props.children}
        </div>
      </Sticky>
    );
  }
}

export { StickyTopNav };
