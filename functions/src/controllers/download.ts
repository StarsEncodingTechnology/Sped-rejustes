import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import os from "os";

// const resolvePath = path.resolve(__dirname + "../../");
const dirTemp = path.join(os.tmpdir());

@Controller("download")
export class DownloadFilesController {
  @Get(":fileName")
  public direcionaArquivoParaDownload(req: Request, res: Response): void {
    const fileDir = `${dirTemp}/${req.params.fileName}`;
    const existe = fs.existsSync(fileDir);
    if (existe) res.download(fileDir);
    else res.render("failure", { motivo: "Download expirado" });
  }
}
