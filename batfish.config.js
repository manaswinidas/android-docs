'use strict';

const _ = require('lodash');
const path = require('path');
const rehypeSlug = require('rehype-slug');
const rehypeHighlightCodeBlock = require('@mapbox/rehype-highlight-code-block');
const mapboxHighlighter = require('@mapbox/mapbox-highlighter');
const mapboxAssembly = require('@mapbox/mapbox-assembly');
const addLinksToHeadings = require('./plugins/add-links-to-headings');
const makeTableScroll = require('./plugins/make-table-scroll');

const productPageOrder = {
  'maps/overview/': [
    'index',
    'styling-map',
    'annotations',
    'camera',
    'events',
    'offline',
    'query',
    'runtime-styling',
    'gestures'
  ],
  'maps/examples/': ['index'],
  'maps/tutorials/': ['index'],
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
  'java/overview/': [
    'index',
    'directions-matrix',
    'geocoder',
    'optimization',
    'static-image'
  ],
  'java/examples/': ['index'],
  'core/overview/': ['index']
};

module.exports = () => {
  const config = {
    siteBasePath: '/android-docs',
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
      platform: function() {
        return 'Android';
      },
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
      },
      listExamples: data => {
        const examples = data.pages
          .filter(page => {
            return /\/examples\/+./.exec(page.path);
          })
          .map(example => {
            return {
              path: example.path,
              title: example.frontMatter.title,
              description: example.frontMatter.description,
              topic: example.frontMatter.topic,
              thumbnail: example.frontMatter.thumbnail
            };
          });
        return examples;
      },
      listSubFolders: data => {
        const folders = data.pages
          .filter(file => {
            return file.path.split('/').length === 5;
          })
          .map(folder => {
            return folder;
          });
        return folders;
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
        addLinksToHeadings,
        makeTableScroll,
        [rehypeHighlightCodeBlock, { highlight: mapboxHighlighter.highlight }]
      ]
    }
  };
  return config;
};
