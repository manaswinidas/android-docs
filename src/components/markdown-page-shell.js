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
      topic: PropTypes.oneOf([
        'Getting started',
        'Dynamic styling',
        'Data visualization',
        '3D',
        'Add markers and infoWindows to the map',
        'User interaction',
        'Add features to a map',
        'Set a map style',
        'Image generation',
        'Offline'
      ]),
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
