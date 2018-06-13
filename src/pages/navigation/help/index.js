/*---
title: 'Help'
description: 'Tutorials, troubleshooting guides and more to help you get started with the Mapbox Navigation SDK for Android.'
product: 'navigation'
---*/

import React from 'react';
import HelpPage from '../../../components/help-page';

export default class NavigationHelpPage extends React.PureComponent {
  render() {
    return <HelpPage frontMatter={this.props.frontMatter} />;
  }
}
