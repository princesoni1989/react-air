import path from 'path';
import express from 'express';
import webpack from 'webpack';
import browserSync from 'browser-sync';
import webpackDevMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import webpackClientConfig from './webpack.client.config';
import webpackServerConfig from './webpack.server.config';
import {dateFormat} from './runner';
import {clean} from './build';

const isDebug = !process.argv.includes('--release');
const watchOptions = {}
function getCompilationPromise(name, compiler, config) {
    return new Promise((resolve, reject) => {
        let timeStart = new Date();
        compiler.plugin('compile', () => {
            timeStart = new Date();
            console.info(`[${dateFormat(timeStart)}] Compiling '${name}'...`);
        });
        compiler.plugin('done', stats => {
            console.info(stats.toString(config.stats));
            const timeEnd = new Date();
            const time = timeEnd.getTime() - timeStart.getTime();
            if (stats.hasErrors()) {
                console.info(
                    `[${dateFormat(timeEnd)}] Failed to compile '${name}' after ${time} ms`,
                );
                reject(new Error('Compilation failed!'));
            } else {
                console.info(
                    `[${dateFormat(
                        timeEnd,
                    )}] Finished '${name}' compilation after ${time} ms`,
                );
                resolve(stats);
            }
        });
    });
}

let server;

async function serve() {
    if (server) return server;
    server = express();
    server.use(errorOverlayMiddleware());
    server.use(express.static(path.resolve(__dirname, '../public')));

    webpackClientConfig.entry.client.unshift('./setup/helper/webpackHotDevClient')
    webpackClientConfig.output.filename = webpackClientConfig.output.filename.replace('chunkhash', 'hash');
    webpackClientConfig.output.chunkFilename = webpackClientConfig.output.chunkFilename.replace('chunkhash', 'hash');
    webpackClientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
    )

    webpackServerConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    webpackServerConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';
    webpackServerConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
    );

    await clean()
    const clientCompiler = webpack(webpackClientConfig);
    const serverCompiler = webpack(webpackServerConfig);

    const clientCompilerPromise = getCompilationPromise('client', clientCompiler, webpackClientConfig);
    const serverCompilerPromise = getCompilationPromise('server', serverCompiler, webpackServerConfig);
    server.use(webpackDevMiddleWare(clientCompiler, {
        publicPath: webpackClientConfig.output.publicPath,
        logLevel: 'silent',
    }))

    server.use(webpackHotMiddleWare(clientCompiler, {
        log: false
    }))


    let appPromise;
    let appPromiseResolve;
    let appPromiseIsResolved = true;
    serverCompiler.plugin('compile', () => {
        if (!appPromiseIsResolved) return;
        appPromiseIsResolved = false;
        // eslint-disable-next-line no-return-assign
        appPromise = new Promise(resolve => (appPromiseResolve = resolve));
    });

    let app;
    server.use((req, res) => {
        appPromise
            .then(() => app.handle(req, res))
            .catch(error => console.error(error));
    });

    function checkForUpdate(fromUpdate) {
        const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
        if (!app.hot) {
            throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
        }
        if (app.hot.status() !== 'idle') {
            return Promise.resolve();
        }
        return app.hot
            .check(true)
            .then(updatedModules => {
                if (!updatedModules) {
                    if (fromUpdate) {
                        console.info(`${hmrPrefix}Update applied.`);
                    }
                    return;
                }
                if (updatedModules.length === 0) {
                    console.info(`${hmrPrefix}Nothing hot updated.`);
                } else {
                    console.info(`${hmrPrefix}Updated modules:`);
                    updatedModules.forEach(moduleId =>
                        console.info(`${hmrPrefix} - ${moduleId}`),
                    );
                    checkForUpdate(true);
                }
            })
            .catch(error => {
                if (['abort', 'fail'].includes(app.hot.status())) {
                    console.warn(`${hmrPrefix}Cannot apply update.`);
                    //delete require.cache[require.resolve('../build/app')];
                    // eslint-disable-next-line global-require, import/no-unresolved
                    app = require('../build/app').default;
                    console.warn(`${hmrPrefix}App has been reloaded.`);
                } else {
                    console.warn(
                        `${hmrPrefix}Update failed: ${error.stack || error.message}`,
                    );
                }
            });
    }

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (app && !error && !stats.hasErrors()) {
            checkForUpdate().then(() => {
                appPromiseIsResolved = true;
                appPromiseResolve();
            });
        }
    });


    await clientCompilerPromise;
    await serverCompilerPromise;

    const timeStart = new Date();
    console.info(`[${dateFormat(timeStart)}] Launching server...`);

    app = require('../build/app').default;
    appPromiseIsResolved = true;
    appPromiseResolve();

    await new Promise((resolve, reject) =>
        browserSync.create().init(
            {
                server: 'src/app.js',
                middleware: [server],
                open: !process.argv.includes('--silent'),
                ...(isDebug ? {} : { notify: false, ui: false }),
            },
            (error, bs) => (error ? reject(error) : resolve(bs)),
        ),
    );

    const timeEnd = new Date();
    const time = timeEnd.getTime() - timeStart.getTime();
    console.info(`[${dateFormat(timeEnd)}] Server launched after ${time} ms`);
    return server;

}

export default serve;
