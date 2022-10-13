import "./util/module-alias";
import { Server } from "@overnightjs/core";
import { Application } from "express";

import { SpedController } from "./controllers/home";
import path from "path";
import { DuplicadoController } from "./controllers/duplicado";
import { DownloadFilesController } from "./controllers/download";
import bodyParser from "body-parser";
import * as express from "express";

export class SetupServer extends Server {
  constructor(
    private port: string = '3000',
    private posicaoPublic: string = "../../../public"
  ) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setControllers();
  }

  private setupExpress(): void {
    // rota para carregamento de imagem
    this.app.use("/imagem", express.static(__dirname + "/views/assests/img/"));
    // não façam isso crianças
    this.app.set("views", path.join(__dirname, "/views"));
    this.app.engine("ejs", require("ejs").renderFile);
    this.app.set("view engine", "ejs");
    this.app.use(bodyParser.urlencoded({ extended: false }));
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
    this.app.listen(3050, () => {
      console.log(" rodando em 3050")
    })
  }
}
