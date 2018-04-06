module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-stage-2',
        '@babel/preset-flow',
        '@babel/preset-react',

    ],
    plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'react-loadable/babel'
    ],
    ignore: ["node_modules", "build"]
};
