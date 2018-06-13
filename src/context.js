import React from 'react';

export const AppContext = React.createContext({
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
  preferredLanguage: 'java',
  changeLang: () => {}
});
