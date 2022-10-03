import "./util/module-alias";

import logger from "./logger";
import express, { Application } from "express";
import { Server } from "@overnightjs/core";
import { SpedController } from "./controllers/sped";
import path from "path";

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
    this.app.engine('html', require('ejs').renderFile);
    this.app.set("view engine", "html");
    this.app.use(
      express.urlencoded({
        extended: false,
      })
    );
  }

  private setControllers(): void {
    const spedController = new SpedController();
    this.addControllers([spedController]);
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
