import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import logger from "@src/logger";
import { Request, Response } from "express";




@Controller('')
@ClassMiddleware()
export class SpedController {
    @Get('')
    public recebeSped(req: Request, res: Response): void {
        logger.info('uai')
        res.render('index')
    }

    @Post('')
    public uploadSpedtxt(req: Request, res: Response) {
        //Perguntamos se depois de validado existe o file dentro do request
        if (req.file) {
          //Se ele existir, retornamos um sucess com o payload do arquivo gerado
          //Aqui sua criatividade é o limite
          return res.json({
            response: req.file,
          });
        }
    
        //Caso não seja um arquivo validado, retornamos o status 409
        //Doc para o status: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/409
        res.status(409);
    
        //E retornamos uma msg para o usuário final: Não é um tipo de arquivo válido
        return res.json({
          response: `Não é um tipo de arquivo válido`,
        });
      }
}