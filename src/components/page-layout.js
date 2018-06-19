import React from 'react';
import PropTypes from 'prop-types';
import { TocMultiPage } from './toc-multi-page';
import { TocSinglePage } from './toc-single-page';
import BackToTopButton from './back-to-top-button';
import Sticky from 'react-stickynode';
import _ from 'lodash';

class PageLayout extends React.Component {
  static propTypes = {
    product: PropTypes.string.isRequired,
    sidebarContent: PropTypes.shape({
      firstLevelToc: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired
        })
      ),
      seccondLevelToc: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired
        })
      )
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 0
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
    const height = document.body.clientHeight;
    this.setState({
      bottomBoundaryValue: height - 450
    });
  }, 200);

  render() {
    let section = this.props.currentPath.split('/')[3];
    let sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);
    let tocContent = null;
    if (/\/overview\//.test(this.props.currentPath)) {
      tocContent = (
        <TocMultiPage
          sidebarContent={this.props.sidebarContent}
          currentPath={this.props.currentPath}
        />
      );
    } else {
      tocContent = (
        <TocSinglePage
          sidebarContent={this.props.sidebarContent}
          product={this.props.product}
          currentPath={this.props.currentPath}
        />
      );
    }
    return (
      <div className="grid grid--gut36 mr-neg36 mr0-mm">
        <div className="col col--4-mm col--12 bg-gray-faint px0 mt0-mm mt60">
          <Sticky
            enabled={true}
            bottomBoundary={this.state.bottomBoundaryValue}
            innerZ={1}
            top={50}
            activeClass="bg-gray-faint shadow-darken-10"
          >
            <div className="txt-ms pt24-mm pt0 viewport-almost-mm scroll-auto mt-neg60 mt0-mm">
              <div className="txt-l color-blue txt-fancy ml36 mb12 block-mm none">
                {sectionTitle}
              </div>
              {tocContent}
            </div>
          </Sticky>
        </div>
        <div
          id="docs-content"
          className="col col--8-mm col--12 mt24 mb60 pr0-mm pr36 prose"
        >
          {this.props.children}
          <BackToTopButton />
        </div>
      </div>
    );
  }
}

export { PageLayout };
