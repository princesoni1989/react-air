import React from "react";
import { hydrate } from "react-dom";
import deepForceUpdate from 'react-deep-force-update';
import Client from "./components/Config/ClientProvider";

const app = document.getElementById('app');
const appInstance = hydrate(<Client />, app);

if (module.hot) {
    module.hot.accept('components/routes', () => {
        if (appInstance && appInstance.updater.isMounted(appInstance)) {
            deepForceUpdate(appInstance);
        }
    });
}
