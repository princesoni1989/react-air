//client imports for server side rendering
import React from "react";
import ReactDom from "react-dom/server";
import prettyError from "pretty-error"
import Html from "components/Html";
import App from "components/Config/ServerProvider";
import ErrorPage from "components/Error/ErrorPage"
import fetchData from "./util/fetchData"
import configureStore from "./store";
import routes from "components/routes";
import assets from "./assets.json"; // eslint-disable-line import/no-unresolved

const printError = new prettyError();
export async function serverRendering(req, res, next) {
  try {
    const store = configureStore()
    const markUp = ReactDom.renderToString(
      <App store={store} location={req.url} context={{}}/>
    )

    await fetchData(req.url, routes, store);
    const matchedRoute = routes.find(route => route.path === req.path);

    //pushing required files
    let scripts = [assets.vendors.js, assets.client.js]
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

  } catch (err) {
    next(err);
  }
}

export async function serverRenderingError(err, req, res) {
  console.log(printError.render(err))
  const markUp = ReactDom.renderToString(<ErrorPage error={err}/>)
  const data = {
    title: 'Internal Server Error',
    description: err.message,
    markUp
  }

  const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
  res.status(err.status || 500);
  res.send(`<!DOCTYPE html>${html}`);
}
