"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupServer = void 0;
require("./util/module-alias");
const core_1 = require("@overnightjs/core");
const home_1 = require("./controllers/home");
const path_1 = __importDefault(require("path"));
const duplicado_1 = require("./controllers/duplicado");
const download_1 = require("./controllers/download");
const body_parser_1 = __importDefault(require("body-parser"));
const express = __importStar(require("express"));
class SetupServer extends core_1.Server {
    port;
    posicaoPublic;
    constructor(port = '3000', posicaoPublic = "../../../public") {
        super();
        this.port = port;
        this.posicaoPublic = posicaoPublic;
    }
    init() {
        this.setupExpress();
        this.setControllers();
    }
    setupExpress() {
        this.app.use("/imagem", express.static(__dirname + "/views/assests/img/"));
        this.app.set("views", path_1.default.join(__dirname, "/views"));
        this.app.engine("ejs", require("ejs").renderFile);
        this.app.set("view engine", "ejs");
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    setControllers() {
        const homeController = new home_1.SpedController();
        const duplicadoController = new duplicado_1.DuplicadoController();
        const downloadFilesController = new download_1.DownloadFilesController();
        this.addControllers([
            homeController,
            duplicadoController,
            downloadFilesController,
        ]);
    }
    close() { }
    getApp() {
        return this.app;
    }
    start() {
        this.app.listen(3050, () => {
            console.log(" rodando em 3050");
        });
    }
}
exports.SetupServer = SetupServer;
//# sourceMappingURL=server.js.map