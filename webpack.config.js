const Config  = require('webpack-config').default;
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const path = require('path');
const webpackDevServerPort = 8080;

// Plugin for building & inlining svg icons in dev/prod builds
const SpriteLoader = require('svg-sprite-loader/plugin');

// Plugin used instead of ExtractTextPlugin (for Webpack 4)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = new Config().merge(
    {
      /**
       * Generate an array of entry points for components/pages and
       * tells webpack where to find entry point for each component/page
       * @returns {Object}
       */
      entry: './app/common/js/index.js',

      /**
       * This option determines the name of each output bundle.
       * The bundle is written to the directory specified by the {output.path} option.
       */
      output: {
        filename: `bundle.[hash].js`,
        path: path.resolve(__dirname + '/dist'),
      },

      devServer: {
        host: '0.0.0.0',
        public: `localhost:${webpackDevServerPort}`,
        port: webpackDevServerPort,
        contentBase: `path.resolve(__dirname + '/dist')`,
        open: true,
        watchContentBase: true,
        disableHostCheck: true,
      },

      /**
       * These options determine how the different types
       * of modules within a project will be treated.
       */
      module: {
        rules: [
          /*HTML*/
          {
            test: /\.(html)$/,
            use: ["html-loader?config=otherHtmlLoaderConfig"],
          },
          /* Javascript */
          {
            test: /\.js$/,

            /**
             * Exclude 'node_modules' folder from transpiling
             * except for 'dom7' library.
             * Because this library isn't already transpiled and it is using by 'Swiper.js'
             */
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
            }],
          },

          /* SCSS */
          {
            test: /\.scss$/,
            use: [{
              loader: MiniCssExtractPlugin.loader,
            },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              // {
              //   loader: 'postcss-loader',
              //   options: {
              //     config: {
              //       path: './configs/postcss.config.js',
              //     },
              //   },
              // },
              {
                loader: 'sass-loader',
              },
            ],
          },

          /* SVG Sprites */
           {
             test: /\.svg$/,
             use: [{
               loader: 'svg-sprite-loader',
             },
               {
                 loader: 'svgo-loader',
                 options: {
                   plugins: [
                     { removeTitle: true },
                   ],
                 },
               }],
           },

          /* Images */
          {
            test: /\.(?:png|jpg|webp)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'common/media/images/',
              },
            }],
          },

        ],
      },
      plugins: [
        /**
         * Creates and inlines SVG Sprite to HTML markup
         * @param {Object}
         */
        new SpriteLoader({
          plainSprite: true,
          spriteAttrs: { hidden: true },
        }),

        new HtmlWebpackPlugin({
          title: 'My Awesome application',
          header: 'app/components/header.scss/header.scss.html',
          filename: 'index.html',
          template: 'app/index.html',
        }),

        new MiniCssExtractPlugin(),

      ],

      /**
       * These options configure whether to polyfill or mock certain Node.js globals and modules.
       * This allows code originally written for the Node.js environment
       * to run in other environments like the browser.
       */
      node: {
        fs: 'empty',
      },
    }
)
