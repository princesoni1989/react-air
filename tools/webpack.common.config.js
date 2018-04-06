import path from "path";

export const isDebug = !process.argv.includes("--release");
export const isVerbose = process.argv.includes("--verbose");
export const isAnalyze = process.argv.includes("--analyze") || process.argv.includes("--analyse");
export const reScript = /\.(js|jsx|mjs)$/;
export const reGraphql = /\.(graphql|gql)$/;
export const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
export const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
export const staticAssetName = isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]';

export default {
  context: path.resolve(__dirname, ".."),
  resolve: {
    modules: ["node_modules", "src"],
  },
  module: {
    rules: [
      {
        test: reScript,
        include: [
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../tools")
        ],
        use: {
          loader: "babel-loader",
        }
      },

      {
        test: reImage,
        oneOf: [
          {
            issuer: reStyle,
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

  plugins: [


  ],
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
