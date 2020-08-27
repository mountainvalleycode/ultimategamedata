const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  // mode: 'production',
  // devtool: 'source-map',
  entry: {
    main: path.join(__dirname, 'src/index.tsx'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|woff2?|eot|ttf)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html', toType: 'file', force: true },
        { from: 'src/index.html', to: 'character/index.html', toType: 'file', force: true },
        { from: 'src/index.html', to: 'stage/index.html', toType: 'file', force: true },
        { from: 'src/index.html', to: 'matchup/index.html', toType: 'file', force: true },
        { from: 'src/index.html', to: 'rankings/index.html', toType: 'file', force: true },
        { from: 'src/index.html', to: 'about/index.html', toType: 'file', force: true },

        { from: 'images/head_icons', to: 'head_icons', toType: 'dir', force: true },
        { from: 'images/favicons', to: 'favicons', toType: 'dir', force: true },

        { from: 'static/full_raw_data.csv', to: 'full_raw_data.csv', toType: 'file', force: true },
      ]
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    modules: [
      path.resolve('./node_modules'),
      // path.resolve('./src'),
    ],
  },
};
