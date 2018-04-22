module.exports = {
  "setupFiles": [
    "raf/polyfill"
  ],
  transform: {
    "\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)": "<rootDir>/setup/helper/fileTransformer.js",
  },
  bail: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: "<rootDir>/coverage", // [string]
  moduleNameMapper: {
    "\\.(css|less|styl|scss|sass|sss)$": "identity-obj-proxy",
  },
  globals: {
    __DEV__: true,
  },
  "setupTestFrameworkScriptFile": "<rootDir>/setup/enzymeConfig.js"
}
