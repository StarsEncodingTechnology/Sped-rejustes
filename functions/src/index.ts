import * as functions from "firebase-functions";
import logger from "./logger";
import { SetupServer } from "./server";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}



logger.info("Iniciando APP");
const port: string = process.env.PORT || "3000";
const server = new SetupServer(port);
server.init();

exports.app = functions.https.onRequest(server.getApp());