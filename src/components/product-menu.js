import React from 'react';
import { prefixUrl } from '@mapbox/batfish/modules/prefix-url';
import { NavbarDropdownMenu } from './navbar-dropdown-menu';

const menuItems = [
  {
    url: prefixUrl('/map-sdk/overview/'),
    text: 'Maps SDK'
  },
  {
    url: prefixUrl('/navigation/overview/'),
    text: 'Navigation SDK'
  },
  {
    url: prefixUrl('/java-sdk/overview/'),
    text: 'Java SDK'
  },
  {
    url: prefixUrl('/plugins/overview/'),
    text: 'Plugins'
  },
  {
    url: prefixUrl('/core/overview/'),
    text: 'Core'
  }
];

export class ProductMenu extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <NavbarDropdownMenu title="Products" items={menuItems} />;
  }
}
