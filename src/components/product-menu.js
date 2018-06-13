import React from 'react';
import PropTypes from 'prop-types';
import PopoverTrigger from '@mapbox/react-popover-trigger';
import Icon from '@mapbox/react-icon';
import { ProductMenuDropdown } from './product-menu-dropdown';
import { ProductNavItems } from '../data/product-nav-items.js';

const popoverProps = {
  placement: 'bottom',
  themePopover: 'round shadow-darken25 h480 scroll-auto'
};

class ProductMenu extends React.PureComponent {
  static propTypes = {
    platform: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired
  };

  renderMenu() {
    return <ProductMenuDropdown categories={ProductNavItems} />;
  }

  onPopoverOpen = () => {
    this.setState({ open: true });
  };

  onPopoverClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <PopoverTrigger
        content={this.renderMenu}
        popoverProps={popoverProps}
        onPopoverOpen={this.onPopoverOpen}
        onPopoverClose={this.onPopoverClose}
      >
        <div className="fl wmax240-ml wmax180-mm flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div className="flex-child inline-block txt-fancy txt-l cursor-pointer border-b border-b--2 border--white border--blue-on-hover txt-truncate">
            {this.props.product} SDK for {this.props.platform}
          </div>
          <Icon
            name="caret-down"
            inline={true}
            className="flex-child fr icon h30 w30"
          />
        </div>
      </PopoverTrigger>
    );
  }
}

export { ProductMenu };
