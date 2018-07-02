# Android documentation

[![CircleCI](https://circleci.com/gh/mapbox/android-docs.svg?style=svg)](https://circleci.com/gh/mapbox/android-docs)

This repo hosts all of the Android documentation for the Mapbox platform, including the Maps SDK, the Java SDK, the Navigation SDK, and Mapbox Plugins. Visit [Mapbox Android Docs](https://www.mapbox.com/android-docs/map-sdk/overview/) to view the live website.

## Getting started

### Installation
To host this website locally, you'll need to have Node.js installed and setup:

```
brew install nodejs
```

Once you have Node.js set up, navigate to this repository's directory on your machine, and run install to grab all the required dependencies:

```
npm install
```

### Hosting locally
The Android documentation uses [Batfish](https://github.com/mapbox/batfish), a static-site generator powered by react and webpack. To get started contributing to the documentation and running the site locally you'll need to navigate to this projects folder and execute:

```
npm start
```

This will set up a server running at http://localhost:8080/android-docs/. If you make changes to the source content, your browser should automatically refresh using livereload once you save the file.

## Contributing new documentation

If you'd like to add to this repo's Android documentation, please read [the contribution guide](/CONTRIBUTING.md) to learn how to get started.