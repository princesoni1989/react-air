import React from "react";
import {hydrate} from "react-dom";
import Loadable from "react-loadable";
import deepForceUpdate from "react-deep-force-update";
import Client from "./components/Config/ClientProvider";

const app = document.getElementById("app");
let appInstance = null;
Loadable.preloadReady().then(() => {
  appInstance = hydrate(<Client />, app);
});

if (module.hot) {
  module.hot.accept("components/routes", () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      deepForceUpdate(appInstance);
    }
  });
}
