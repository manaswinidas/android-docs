import React from 'react';
import { AppContext } from '../context.js';

// Disable Raven if this isn't a production build, so we don't send development
// errors to Sentry.
if (process.env.DEPLOY_ENV !== 'production' && typeof window !== 'undefined') {
  window.MapboxPageShell.disableRaven();
}

if (typeof window !== 'undefined') {
  window.MapboxPageShellProduction = true;
  import(/* webpackChunkName: "assembly-js" */ '@mapbox/mapbox-assembly/dist/assembly.js');
}

class ApplicationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredLanguage: 'java'
    };
    this.changeLanguage = nextLang => {
      this.setState({ preferredLanguage: nextLang });
    };
  }

  render() {
    const context = {
      platform: 'Android',
      languages: [
        {
          label: 'Java',
          value: 'java'
        },
        {
          label: 'Kotlin',
          value: 'kotlin'
        }
      ],
      preferredLanguage: this.state.preferredLanguage,
      changeLanguage: this.changeLanguage
    };
    return (
      <AppContext.Provider value={context}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default ApplicationWrapper;
