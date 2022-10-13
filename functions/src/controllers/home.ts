import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import { Request, Response } from "express";


@Controller("")
export class SpedController {
  @Get("")
  public recebeSped(req: Request, res: Response): void {
    res.render("./index");
  }
}
