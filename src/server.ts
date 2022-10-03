import "./util/module-alias";


import bodyParser from "body-parser";
import expressPino from "express-pino-logger";
import logger from "./logger";
import cors from "cors";
import { Application } from "express";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser);
    this.app.use(expressPino({ logger }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private setControllers(): void {}

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
