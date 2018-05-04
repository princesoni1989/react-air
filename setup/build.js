/**
 * Created by ttnd on 15/3/18.
 */
import webpack from "webpack";
import path from "path";
import cp from "child_process";
import mkdir from "make-dir";
import {writeFile, copyDir, cleanDir} from "./helper/fs";
import pkg from "../package.json";
import webpackConfig from "./webpack.config";

const serverPath = path.join(webpackConfig[1].output.path, "app");

let server = null;

export async function clean() {
  return Promise.all([
    cleanDir("build/*", {
      nosort: true
    })
  ]);
}

export async function copy() {
  return Promise.all([
    await mkdir("build"),
    writeFile("build/package.json", JSON.stringify({
        private: true,
        dependencies: pkg.dependencies,
        scripts: {
          start: `node server.js`
        }
      }, null, 2)
    ),

    copyDir("src/public", "build/public")
  ]);
}

export async function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, status) => {
      if (err) return reject(err);

      console.log(status.toString(webpackConfig[0].stats)); // eslint-disable-line  no-console
      if (status.hasErrors()) {
        return new Error("Webpack compilation Error");
      }
      return resolve();
    });
  });
}

function runServer() {
  return new Promise((resolve) => {
    function onData(data) {
      process.stdout.write(data);
    }

    function onError(data) {
      process.stderr.write(data);
    }

    if (server) {
      server.kill('SIGTERM');
    }
    server = cp.spawn("node", [serverPath], {
      env: Object.assign({NODE_ENV: 'development'}, process.env),
      silent: false,
    });
    server.stdout.on("data", onData);
    server.stderr.on("data", onError);
  })

}

export default async function build() {
  await clean();
  await bundle();
  await copy();

  if (process.argv.includes("--serve")) {
    await runServer();
  }
}

process.on("exit", () => {
  if (server) {
    server.kill('SIGTERM');
  }
});
