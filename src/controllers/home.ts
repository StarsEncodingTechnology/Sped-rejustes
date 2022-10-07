import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import logger from "@src/logger";
import { imputFileMiddleware } from "@src/middleware/upload/spedtxt";
import { Request, Response } from "express";
import multer from "multer";

@Controller("")
export class SpedController {
  @Get("")
  public recebeSped(req: Request, res: Response): void {
    res.render("index", {userName: "asdasd" });
  }
}
