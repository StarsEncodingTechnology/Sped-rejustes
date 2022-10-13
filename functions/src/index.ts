import * as functions from "firebase-functions";
import logger from "./logger";
import { SetupServer } from "./server";


logger.info("Iniciando APP");
const port: string = process.env.PORT || "3000";
const server = new SetupServer(port);
server.init();
// server.start();
exports.app = functions.https.onRequest(server.getApp());