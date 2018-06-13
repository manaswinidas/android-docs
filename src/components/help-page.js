import React from 'react';
import PropTypes from 'prop-types';
import PageShell from './page-shell';
import { HelpSection } from './help-section';
import { RelatedHelpPages } from '../data/related-help-pages.js';

class HelpPage extends React.PureComponent {
  static propTypes = {
    frontMatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired
    }).isRequired
  };
  render() {
    const helpSections = RelatedHelpPages.map((section, index) => {
      return (
        <HelpSection
          key={index}
          path={section.path}
          title={section.title}
          description={section.description}
          guides={section.guides}
          product={this.props.frontMatter.product}
        />
      );
    });
    return (
      <PageShell frontMatter={this.props.frontMatter}>
        <div className="txt-l">
          Our Help page contains tutorials, troubleshooting guides, and other
          resources to help you get started.
        </div>
        {helpSections}
      </PageShell>
    );
  }
}

export default HelpPage;
