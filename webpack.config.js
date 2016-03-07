const webpack = require(`webpack`);

module.exports = {
  entry: `./nodep-date-input-polyfill.js`,

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: [`$super`, `$`, `exports`, `require`]
      },
      compress: {
        warnings: false
      }
    })
  ],

  resolve: {
    extensions: [``, `.js`]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: `babel`,
        query: {
          plugins: [`transform-runtime`],
          presets: [`es2015`, `stage-3`],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: `style!css`
      },
      {
        test: /\.scss$/,
        loader: `style!css!sass`
      }
    ]
  },

  devtool: `cheap-module-eval-source-map`,
  output: {
    path: process.cwd()+`/`,
    filename: `nodep-date-input-polyfill.dist.js`
  }
};
