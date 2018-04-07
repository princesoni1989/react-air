import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import nodeExternals from "webpack-node-externals";
import common, {
  isDebug,
  stylePattern,
  imagePattern
} from "./webpack.common.config";

export default merge.smart(common, {
  name: "server",
  target: "node",
  entry: {
    app: ["@babel/polyfill", "./src/app.js"]
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
        test: stylePattern,
        use: [
          {
            loader: "css-loader/locals"
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
      whitelist: [stylePattern, imagePattern],
    })
  ]
});
