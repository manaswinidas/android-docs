/*---
title: 'Help'
description: 'Tutorials, troubleshooting guides and more to help you get started with the Mapbox Maps SDK for Android.'
product: 'maps'
---*/

import React from 'react';
import HelpPage from '../../../components/help-page';

export default class MapsHelpPage extends React.PureComponent {
  render() {
    return <HelpPage frontMatter={this.props.frontMatter} />;
  }
}
