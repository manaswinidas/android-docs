'use strict';

const _ = require('lodash');
const path = require('path');
const rehypeSlug = require('rehype-slug');
const rehypeHighlightCodeBlock = require('@mapbox/rehype-highlight-code-block');
const mapboxHighlighter = require('@mapbox/mapbox-highlighter');
const mapboxAssembly = require('@mapbox/mapbox-assembly');

const productPageOrder = {
  'map-sdk/overview/': [
    'index',
    'styling-map',
    'annotations',
    'camera',
    'events',
    'offline',
    'query',
    'runtime-styling',
    'gestures',
    'snapshotter'
  ],
  'map-sdk/examples/': ['index'],
  'map-sdk/tutorials/': ['index'],
  'plugins/overview/': [
    'index',
    'building',
    'location-layer',
    'traffic',
    'localization',
    'places',
    'china',
    'offline'
  ],
  'plugins/examples/': ['index'],
  'navigation/overview/': [
    'index',
    'milestones',
    'navigation-options',
    'navigation-ui',
    'off-route',
    'faster-route',
    'camera',
    'route-progress',
    'map-matching'
  ],
  'java-sdk/overview/': [
    'index',
    'directions-matrix',
    'geocoder',
    'optimization',
    'static-image',
    'turf'
  ],
  'java-sdk/examples/': ['index'],
  'core/overview/': ['index']
};

module.exports = () => {
  const config = {
    siteBasePath: 'android-docs',
    siteOrigin: 'https://www.mapbox.com',
    browserslist: mapboxAssembly.browsersList,
    postcssPlugins: mapboxAssembly.postcssPipeline.plugins,
    stylesheets: [
      require.resolve('@mapbox/mapbox-assembly/dist/assembly.css'),
      require.resolve('@mapbox/mapbox-highlighter/dist/mapbox.css'),
      path.join(__dirname, './vendor/dotcom-page-shell/page-shell-styles.css'),
      path.join(__dirname, './src/css/site.css')
    ],
    dataSelectors: {
      // Returns a dictionary for looking up ordered array of pages by product id
      // (slug).
      orderedPages: data => {
        const pages = data.pages.map(p => ({
          title: p.frontMatter.title,
          path: p.path
        }));
        const result = _.reduce(
          productPageOrder,
          (reduced, order, prefix) => {
            reduced[prefix] = order.map(item => {
              return pages.find(p => {
                const urlEnding = item === 'index' ? '' : `${item}/`;
                return new RegExp(`${prefix}${urlEnding}$`).test(p.path);
              });
            });
            return reduced;
          },
          {}
        );
        return result;
      }
    },
    webpackLoaders: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@mapbox/svg-react-transformer-loader',
            options: {
              template: 'fancy'
            }
          }
        ]
      }
    ],
    babelPlugins: [require('babel-plugin-lodash')],
    applicationWrapperPath: path.join(
      __dirname,
      'src/components/application-wrapper.js'
    ),
    vendorModules: ['@mapbox/appropriate-images-react', 'array-find'],
    inlineJs: [
      {
        filename: path.join(
          __dirname,
          'vendor/dotcom-page-shell/page-shell-script.js'
        )
      }
    ],
    jsxtremeMarkdownOptions: {
      wrapper: path.join(__dirname, './src/components/markdown-page-shell.js'),
      rehypePlugins: [
        rehypeSlug,
        [rehypeHighlightCodeBlock, { highlight: mapboxHighlighter.highlight }]
      ]
    }
  };
  return config;
};
