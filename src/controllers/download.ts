import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";



const resolvePath = path.resolve("src");
const dirTemp = path.join(resolvePath, "temp");

@Controller("download")
export class DownloadFilesController {

  @Get(":fileName")
  public direcionaArquivoParaDownload(req: Request, res: Response): void {
    const fileDir = `${dirTemp}/${req.params.fileName}`
    const existe = fs.existsSync(fileDir)
    if(existe) res.download(fileDir)
    else res.render('failure', {motivo: "Download expirado"})
  }
}