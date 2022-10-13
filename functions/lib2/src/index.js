"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const server_1 = require("./server");
logger_1.default.info("Iniciando APP");
const port = process.env.PORT || "3000";
const server = new server_1.SetupServer(port);
server.init();
server.start();
//# sourceMappingURL=index.js.map