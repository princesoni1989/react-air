/**
 * Created by ttnd on 15/3/18.
 */
import webpack from "webpack";
import { cleanDir } from "./libs/fs";
import mkdir from "make-dir";
import { writeFile, copyDir } from "./libs/fs";
import pkg from "../package.json";

import webpackConfig from "./webpack.config";
import runServer from "./runServer"

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

      console.log(status.toString(webpackConfig[0].stats));
      if (status.hasErrors()) {
        return new Error("Webpack compilation Error");
      }
      return resolve();
    });
  });
}

export default async function build() {
  await clean();
  await bundle();
  await copy();

  if(process.argv.includes("--serve")){
    await runServer();
  }
}
