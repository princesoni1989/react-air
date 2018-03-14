/**
 * Created by ttnd on 18/3/18.
 */

import cp from "child_process";
import path from "path";
import serverConfig from "./webpack.config";

const serverPath = path.join(serverConfig[1].output.path, "app");
let server = null;

function runServer() {
  return new Promise((resolve, reject) => {
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
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });
    server.stdout.on("data", onData);
    server.stderr.on("data", onError);
  })

}

process.on("exit", () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;
