import http from "http";
import { logger } from "../logger.js";
import Routes from "./config/routes.js";

const routes = new Routes();
const app = http.createServer(routes.handler.bind(routes));

const upServer = () => {
  const { address, port } = app.address();
  logger.info(`Started at http://${address}:${port}`);
};

app.listen(3000, upServer);
