import React from 'react';
import ControlToggleSet from '@mapbox/react-control-toggle-set';
import { AppContext } from '../context.js';

export default class CodeLanguageToggle extends React.Component {
  unconnectedToggle(context) {
    return (
      <ControlToggleSet
        id="ios-languages"
        themeToggleGroup="bg-blue py3 px3 mb12"
        themeToggle="txt-s py3 toggle--white toggle--active-blue"
        onChange={value => {
          context.changeLanguage(value);
        }}
        value={context.preferredLanguage}
        options={context.languages}
      />
    );
  }

  render() {
    return <AppContext.Consumer>{this.unconnectedToggle}</AppContext.Consumer>;
  }
}
