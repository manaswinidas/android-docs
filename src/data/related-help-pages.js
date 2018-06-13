const RelatedHelpPages = [
  {
    path: 'tutorials',
    title: 'Tutorials',
    description:
      'Find a step-by-step guide to help you get started or take your project to the next level.',
    guides: [
      {
        title: 'First steps with the Mapbox Maps SDK for Android',
        description:
          'Walk through installing the Mapbox Maps SDK for Android, getting a map on the screen, and changing the map style',
        path: 'https://www.mapbox.com/help/first-steps-android-sdk/',
        products: ['maps']
      },
      {
        title: 'Runtime styling for Android',
        description:
          'Change various properties of a map based on user interaction and other "runtime" situations.',
        path: 'https://www.mapbox.com/help/android-runtime-styling-intro/',
        products: ['maps']
      },
      {
        title: 'Data-driven styling for Android',
        description:
          'Create a map for Android that styles a circle based on a data attribute.',
        path: 'https://www.mapbox.com/help/android-dds-circle-layer/',
        products: ['maps']
      },
      {
        title: 'Build a store locator for Android',
        description:
          'Build a store locator to integrate into a an Android application.',
        path: 'https://www.mapbox.com/help/android-store-locator/',
        products: ['maps']
      },
      {
        title: 'Build a navigation app for Android',
        description: 'Integrate navigation into any Android application.',
        path: 'https://www.mapbox.com/help/android-navigation-sdk/',
        products: ['navigation']
      }
    ]
  },
  {
    path: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Learn how to resolve common issues.',
    guides: [
      {
        title: 'Understanding Android APK size',
        description:
          'Learn how to measure and optimize your Android app’s size.',
        path: 'https://www.mapbox.com/help/android-apk-size/',
        products: ['maps', 'navigation']
      },
      {
        title: 'Change your map’s label language',
        description:
          'Learn about available languages and how to change your map’s language.',
        path: 'https://www.mapbox.com/help/change-language/',
        products: ['maps', 'navigation']
      },
      {
        title: 'Offline maps',
        description: 'Learn about how offline maps work.',
        path: 'https://www.mapbox.com/help/mobile-offline/',
        products: ['maps']
      }
    ]
  },
  {
    path: 'interactive-tools',
    title: 'Interactive tools',
    description: 'Experiment with Mapbox tools.',
    guides: [
      {
        title: 'Mapbox offline tile count estimator',
        description:
          'Estimate the number of tiles required to download an offline region using the Mapbox Maps SDK for Android and iOS.',
        path: 'https://www.mapbox.com/help/offline-estimator/',
        products: ['maps']
      },
      {
        title: 'Marker playground',
        description:
          'Add a marker to the map and view the platform-specific code to recreate this map in your own iOS, Android, React Native, or web application.',
        path: 'https://www.mapbox.com/help/marker-playground/',
        products: ['maps']
      }
    ]
  }
];

export { RelatedHelpPages };
