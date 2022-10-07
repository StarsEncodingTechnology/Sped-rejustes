import "./util/module-alias";

import logger from "./logger";
import { Server } from "@overnightjs/core";
import express, { Application } from "express";

import { SpedController } from "./controllers/home";
import path from "path";
import { DuplicadoController } from "./controllers/duplicado";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setControllers();
  }

  private setupExpress(): void {
    // não façam isso crianças 
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine('ejs', require('ejs').renderFile);
    this.app.set("view engine", "ejs");
    // this.app.use(
    //   express.urlencoded({
    //     extended: false,
    //   })
    // );
  }

  private setControllers(): void {
    const homeController = new SpedController();
    const duplicadoController = new DuplicadoController();
    this.addControllers([homeController, duplicadoController]);
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
