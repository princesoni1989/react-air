import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import AssetsPlugin from "assets-webpack-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import {ReactLoadablePlugin} from 'react-loadable/webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import common, {
  isAnalyze,
  isDebug,
  isVerbose,
  reStyle
} from "./webpack.common.config";

export default merge.smart(common, {
  name: "client",
  target: "web",
  entry: {
    client: ["@babel/polyfill", "./src/client.js"]
  },
  output: {
    path: path.resolve(__dirname, "../build/public/assets"),
    publicPath: "/assets/",
    pathinfo: isVerbose,
    filename: isDebug ? "[name].js" : "[name].[chunkhash:8].js",
    chunkFilename: isDebug ? "[name].chunk.js" : "[name].[chunkhash:8].chunk.js"
  },
  mode: isDebug ? "development" : "production",
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: reStyle,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "./tools/postcss.config.js"
              }
            }
          }
        ]
      },
    ]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial"
        }

      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": isDebug ? '"development"' : '"production"',
      "process.env.BROWSER": true,
      __DEV__: isDebug
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, "../build"),
      filename: "assets.json",
      prettyPrint: true
    }),

    ...(isDebug ? [] : [
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]),
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
  ],

  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
});
