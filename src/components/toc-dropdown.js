import React from 'react';
import PropTypes from 'prop-types';
import ControlSelect from '@mapbox/react-control-select';
import { routeToPrefixed } from '@mapbox/batfish/modules/route-to';

export default class TocDropdown extends React.Component {
  static propTypes = {
    tocType: PropTypes.string.isRequired,
    dropdownOptions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    ).isRequired
  };

  render() {
    const optionsArray = this.props.dropdownOptions.map(option => {
      return {
        label: option.title,
        value: option.path
      };
    });
    let currentOption = optionsArray.filter(option => {
      return this.props.currentPath == option.value;
    });

    return (
      <div className="py24 px24 flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <ControlSelect
          id="navigate-this-section"
          onChange={value => {
            routeToPrefixed(value);
          }}
          value={currentOption[0].value}
          options={optionsArray}
          themeControlSelect="select--stroke round-full bg-white"
          themeControlSelectContainer="flex-child flex-child--no-shrink"
        />
      </div>
    );
  }
}
