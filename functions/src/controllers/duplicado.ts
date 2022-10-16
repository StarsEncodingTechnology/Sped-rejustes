import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import logger from "@src/logger";
import { CriaArquivoParaDownlaod } from "@src/services/criaArquivoParaDownload";
import { RemoveDuplicados0150 } from "@src/services/RemoveDuplicados0150";
import {interfaceRequest, txtUpload} from "@src/middleware/upload/spedtxt";
import { Request, Response } from "express";

@Controller("duplicado")
export class DuplicadoController {
  @Get("")
  public recebeSped(req: Request, res: Response): void {
    res.render("duplicado");
  }

  @Post("")
  @Middleware(txtUpload)
  public async uploadSpedtxt(req: interfaceRequest, res: Response): Promise<void> {
    //Perguntamos se depois de validado existe o file dentro do request
    
    if (req.files) {
      try {
        //Se ele existir, retornamos um sucess com o payload do arquivo gerado
        //Aqui sua criatividade é o limite
        const file = req.files[0]
        const removeDuplicados0150 = new RemoveDuplicados0150();
        const arrayFileFix = await removeDuplicados0150.normalizaTxt(file);
        const criaArquivoParaDownload = new CriaArquivoParaDownlaod(
          arrayFileFix
        );
        const nomeArquivo = await criaArquivoParaDownload.retornaDirArquivo();

        res.render("sucess", { linkArquivo: `/download/${nomeArquivo}` });
      } catch (e) {
        logger.error({e});
        res.render("failure", { motivo: e });
      }
    } else {
      logger.error("Arquivo invalido");
      res.render("failure", { motivo: "Possivelmente arquivo invalido" });
    }
  }
}
