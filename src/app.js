import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import compression from "compression";
import mongoose from 'mongoose';

import config from "server/config";
import bootstrap from "server/bootstrap"
import {
  serverRendering,
  serverRenderingError
} from "client/serverRendering"
import {port} from "./config"
import routes from 'server/routes';

//setting up mongo db connection
mongoose.connect(config.mongo.url, config.mongo.options);
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

//express app settings
const app = express();
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bootstrap.apiResponseGenerator)
//server api
app.use('/api', routes);

//route for server side rendering page
app.get("*", serverRendering);

//route for server side rendering error page
app.use((err, req, res, next) => serverRenderingError(err, req, res, next));

if(!module.hot){
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
}



if (module.hot) {
  app.hot = module.hot;
}

export default app
