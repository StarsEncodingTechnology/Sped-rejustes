import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import logger from "@src/logger";
import { imputFileMiddleware } from "@src/middleware/upload/spedtxt";
import { Request, Response } from "express";
import multer from "multer";

@Controller("duplicado")
export class DuplicadoController {
  @Get("")
  public recebeSped(req: Request, res: Response): void {
    res.render("duplicado");
  }

  @Post("")
  @Middleware(multer(imputFileMiddleware.getConfig).single("imputTxt"))
  public uploadSpedtxt(req: Request, res: Response): void {
    //Perguntamos se depois de validado existe o file dentro do request
    if (req.file) {
      //Se ele existir, retornamos um sucess com o payload do arquivo gerado
      //Aqui sua criatividade é o limite
      res.render("sucess");
    } else {
      logger.info("não localizado");
      res.send("failure");
    }
  }
}
