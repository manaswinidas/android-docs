import React from 'react';
import PropTypes from 'prop-types';
import PageShell from './page-shell';
import OverviewGuide from './overview-guide';
import platform from '@mapbox/batfish/data/platform';

export default class MarkdownPageShell extends React.Component {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      visualExample: PropTypes.shape({
        filename: PropTypes.string,
        rotation: PropTypes.oneOf(['horizontal', 'vertical']),
        fileFormat: PropTypes.oneOf(['png', 'mp4'])
      }),
      headings: PropTypes.arrayOf(
        PropTypes.shape({
          level: PropTypes.number.isRequired,
          slug: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        })
      )
    }).isRequired,
    children: PropTypes.node.isRequired,
    // From withLocation
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const product = this.props.location.pathname.split('/')[2];
    const productProper = product.charAt(0).toUpperCase() + product.slice(1);
    const pageMeta = {
      title: this.props.frontMatter.title,
      description: this.props.frontMatter.description,
      overviewHeaderProps: this.props.frontMatter.overviewHeaderProps
    };
    let contents = null;
    if (this.props.location.pathname.indexOf('/examples/') > -1) {
      contents = this.props.children;
    } else {
      contents = (
        <OverviewGuide
          productProper={productProper}
          platform={platform}
          overviewHeaderProps={pageMeta.overviewHeaderProps}
          content={this.props.children}
        />
      );
    }

    return (
      <PageShell
        {...this.props}
        meta={pageMeta}
        headings={this.props.frontMatter.headings}
      >
        {contents}
      </PageShell>
    );
  }
}
