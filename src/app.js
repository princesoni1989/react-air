import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  serverRendering,
  serverRenderingError
} from "client/serverRendering"

import {port} from "./config"

// express app settings
const app = express();
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// route for server side rendering page
app.get("*", serverRendering);

// route for server side rendering error page
app.use((err, req, res, next) => serverRenderingError(err, req, res, next));

if (!module.hot) {
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
}

if (module.hot) {
  app.hot = module.hot;
}

export default app
