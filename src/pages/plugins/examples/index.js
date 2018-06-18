/*---
title: 'Examples'
description: 'Working code examples of Mapbox Plugins for Android'
product: 'plugins'
---*/

import React from 'react';
import ExamplesPage from '../../../components/examples-page';

export default class PluginsExamplesPage extends React.PureComponent {
  render() {
    return <ExamplesPage frontMatter={this.props.frontMatter} />;
  }
}
