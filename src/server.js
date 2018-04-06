import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import React from "react";
import ReactDom from "react-dom/server";

import Html from "components/Html";
import App from "components/Config/ServerProvider";
import ErrorPage from "components/Error/ErrorPage"
import assets from "./assets.json"; // eslint-disable-line import/no-unresolved
import fetchData from "./util/fetchData"
import configureStore from "./store";
import routes from "components/routes";
import Api from './backend';

// express app settings
const app = express();
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', Api);

app.get("*", async(req, res) => {
  const store = configureStore()
  const markUp = ReactDom.renderToString(
    <App store={store} location={req.url} context={{}}/>
  )

  await fetchData(req.url, routes, store);
  const matchedRoute = routes.find(route => route.path === req.path);

  //pushing required files
  let scripts = [ assets.vendors.js, assets.client.js]
  let styles = [assets.client.css];
  if (matchedRoute) {
    scripts.push(assets[matchedRoute.name].js);
    styles.push(assets[matchedRoute.name].css);
  }

  const data = {
    scripts,
    styles,
    title: matchedRoute && matchedRoute.title,
    markUp,
    initialState: store.getState()
  }

  const html = ReactDom.renderToStaticMarkup(<Html {...data} />)
  res.status(200);
  return res.send(`<!DOCTYPE html>${html}`);
});

app.use((err, req, res, next) => {
  const markUp = ReactDom.renderToString(<ErrorPage error={err}/>)
  const data = {
    title: 'Internal Server Error',
    description: err.message,
    markUp
  }

  const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
  res.status(err.status || 500);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(4848, () => {
  console.log("Server started at port 4848");
});

if (module.hot) {
  module.hot.accept('components/routes');
  app.hot = module.hot;
}

export default app
