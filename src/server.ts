import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
// import  routes from "./routes";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import hostValidation from "host-validation";
import { db } from './Models/index'
import { getConfig } from "./config";
import { redisDb } from "./services/redisClient";

const routes = require('./routes').default;
 



process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
  });
  process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
  });

  const config = getConfig()

  db.init({config})
  redisDb.redisClientInit(config.redisUrl)

const router = express();
router.use(hostValidation({ hosts: ['127.0.0.1:3000', 'localhost:3000',
                                ] }))


applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);


const { PORT = 3000 } = process.env;
const server = http.createServer(router);



server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);