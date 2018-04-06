import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import nodeExternals from "webpack-node-externals";

import {ReactLoadablePlugin} from 'react-loadable/webpack';
import common, { isDebug, reImage, reStyle } from "./webpack.common.config";

export default merge.smart(common, {
  name: "server",
  target: "node",
  entry: {
    server: ["./src/server.js"]
  },
  mode: isDebug ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: reStyle,
        use: [
          {
            loader: "css-loader/locals",
          },
          {
            loader: "sass-loader"
          },
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": isDebug ? '"development"' : '"production"',
      "process.env.BROWSER": false,
      __DEV__: isDebug
    }),

    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  externals: [
    "./assets.json",
    nodeExternals({
      whitelist: [reStyle, reImage],
    })
  ]
});
