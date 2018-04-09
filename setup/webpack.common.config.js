import path from "path";

export const isDebug = !process.argv.includes("--release");
export const isVerbose = process.argv.includes("--verbose");
export const isAnalyze = process.argv.includes("--analyze") || process.argv.includes("--analyse");
export const scriptPattern = /\.(js|jsx|mjs)$/;
export const stylePattern = /\.(css|less|styl|scss|sass|sss)$/;
export const imagePattern = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
export const staticAssetName = isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';

export default {
  context: path.resolve(__dirname, ".."),
  resolve: {
    modules: ["node_modules", "src", "src/client"],
  },
  module: {
    rules: [
      {
        test: scriptPattern,
        include: [
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../setup")
        ],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: imagePattern,
        oneOf: [
          {
            issuer: stylePattern,
            oneOf: [
              {
                test: /\.svg$/,
                loader: "svg-url-loader",
                options: {
                  name: staticAssetName,
                  limit: 4096,
                  emitFile: false
                }
              },
              {
                loader: "url-loader",
                options: {
                  name: staticAssetName,
                  limit: 4096,
                  emitFile: false
                }
              }
            ]
          },
          {
            loader: "file-loader",
            options: {
              name: staticAssetName,
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  bail: !isDebug,
  cache: isDebug,
  stats: {
    cached: isVerbose,
    cachedAssets: isVerbose,
    chunks: isVerbose,
    chunkModules: isVerbose,
    colors: true,
    hash: isVerbose,
    modules: isVerbose,
    reasons: isDebug,
    timings: true,
    version: isVerbose
  },
};
