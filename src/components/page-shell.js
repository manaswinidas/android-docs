import React from 'react';
import PropTypes from 'prop-types';
import { withLocation } from '@mapbox/batfish/modules/with-location';
import ReactPageShell from '../../vendor/dotcom-page-shell/react-page-shell.js';
import platform from '@mapbox/batfish/data/platform';
import { StickyTopNav } from './sticky-top-nav';
import { PageLayout } from './page-layout';
import { ProductMenu } from './product-menu';
import { TopNavTabs } from './top-nav-tabs';
import listSubFolders from '@mapbox/batfish/data/list-sub-folders';
import listExamples from '@mapbox/batfish/data/list-examples';
import orderedPages from '@mapbox/batfish/data/ordered-pages';
import { MAP_SDK_VERSION, NAVIGATION_VERSION } from '../constants';

class PageShell extends React.Component {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      product: PropTypes.string
    }).isRequired,
    children: PropTypes.node.isRequired,
    // From withLocation
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    headings: PropTypes.arrayOf(
      PropTypes.shape({
        level: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    )
  };

  render() {
    const { frontMatter, location, children } = this.props;
    const meta = this.props.meta || {};
    if (!meta.title && frontMatter.title) {
      meta.title = frontMatter.title;
    }
    if (!meta.description && frontMatter.description) {
      meta.description = frontMatter.description;
    }
    if (!meta.pathname) {
      meta.pathname = location.pathname;
    }

    const normalizedPathname = /\/$/.test(this.props.location.pathname)
      ? this.props.location.pathname
      : `${this.props.location.pathname}/`;
    const baseUrl = location.pathname.split('/')[1];
    const checkBaseUrl = new RegExp(`/${baseUrl}/([^/]+/)([^/]+/)`);
    const pathPrefixMatch = checkBaseUrl.exec(normalizedPathname);
    if (!pathPrefixMatch) {
      throw new Error(`No subnav known for ${this.props.location.pathname}`);
    }

    const product = location.pathname.split('/')[2];
    const productProper = product.charAt(0).toUpperCase() + product.slice(1);

    let sidebarContent = {};

    if (location.pathname.indexOf('help') > -1) {
      sidebarContent = {
        firstLevelToc: null,
        secondLevelToc: listExamples
      };
    } else if (location.pathname.indexOf('examples') > -1) {
      sidebarContent = {
        firstLevelToc: null,
        secondLevelToc: listExamples
      };
    } else {
      sidebarContent = {
        firstLevelToc: orderedPages[pathPrefixMatch[1] + pathPrefixMatch[2]],
        secondLevelToc: this.props.headings.filter(heading => {
          return heading.level === 2;
        })
      };
    }
    let title = null;
    if (meta.title !== 'Introduction') {
      title = (
        <h1 className="pt0 mt0 mb12 prose txt-fancy txt-xl">{meta.title}</h1>
      );
    }

    const folder = location.pathname.split('/')[2];
    let apiTabURL = null;
    if (product === 'maps') {
      apiTabURL = `/${baseUrl}/api/${MAP_SDK_VERSION}`;
    } else if (product === 'navigation') {
      apiTabURL = `/mapbox-navigation-ios/navigation/${NAVIGATION_VERSION}/`;
    } else {
      apiTabURL = '#';
    }

    const subFolders = listSubFolders
      .filter(folder => {
        return (
          folder.path.indexOf(product) > -1 &&
          folder.path.indexOf('overview') < 0
        );
      })
      .map(tab => {
        let title = '';
        if (tab.frontMatter.title === 'Introduction') {
          title = 'Overview';
        } else {
          title = tab.frontMatter.title;
        }
        return {
          name: title,
          id: tab.path.split('/')[3],
          url: tab.path
        };
      });

    subFolders.unshift({
      name: 'Overview',
      id: 'overview',
      path: `/${baseUrl}/${folder}/overview/`
    });
    subFolders.push({
      name: 'API reference',
      id: 'api',
      url: apiTabURL
    });

    const activeTab = location.pathname.split('/')[3];

    return (
      <ReactPageShell {...this.props} meta={meta} darkHeaderText={true}>
        <div className="shell-header-buffer" />
        <StickyTopNav
          currentPath={location.pathname}
          platform={platform}
          product={productProper}
        >
          <div className="limiter">
            <div className="grid grid--gut36 mr-neg36 mr0-mm">
              <div className="col col--4-mm col--12">
                <ProductMenu platform={platform} product={productProper} />
              </div>
              <div className="col col--8-mm col--12">
                <TopNavTabs options={subFolders} activeTab={activeTab} />
              </div>
            </div>
          </div>
        </StickyTopNav>
        <div className="limiter">
          <PageLayout
            sidebarContent={sidebarContent}
            product={product}
            currentPath={location.pathname}
          >
            {title}
            {children}
          </PageLayout>
        </div>
      </ReactPageShell>
    );
  }
}

export default withLocation(PageShell);
