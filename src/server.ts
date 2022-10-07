import "./util/module-alias";

import logger from "./logger";
import { Server } from "@overnightjs/core";
import express, { Application } from "express";

import { SpedController } from "./controllers/home";
import path from "path";
import { DuplicadoController } from "./controllers/duplicado";
import { DownloadFilesController } from "./controllers/download";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setControllers();
  }

  private setupExpress(): void {
    this.app.use("/imagem", express.static(__dirname + "/views/assests/img/"));
    // rota para carregamento de imagem

    // não façam isso crianças
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine("ejs", require("ejs").renderFile);
    this.app.set("view engine", "ejs");

    this.app.use(
      express.urlencoded({
        extended: false,
      })
    );
  }

  private setControllers(): void {
    const homeController = new SpedController();
    const duplicadoController = new DuplicadoController();
    const downloadFilesController = new DownloadFilesController();
    this.addControllers([
      homeController,
      duplicadoController,
      downloadFilesController,
    ]);
  }

  public close(): void {}

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info("Server rodando em: " + this.port);
    });
  }
}
