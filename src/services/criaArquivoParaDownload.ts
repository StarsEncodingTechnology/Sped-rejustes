import { DeleteFile } from "@src/util/deleteFile";
import * as fs from "fs";
import path from "path";

const resolvePath = path.resolve("src");
const dirTemp = path.join(resolvePath, "temp");

export class CriaArquivoParaDownlaod {
  private stringArquivo: string = "";
  private linha0000: string[] = [];

  constructor(dadosArquivo: string[][]) {
    this.stringArquivo = this.converterArrayEmString(dadosArquivo);
    this.linha0000 = dadosArquivo[0];
    //  converte o dados em string
    //  separa o nome
  }

  private criaNomeArquivo(): string {
    const nomeArquivo = `${this.linha0000[5].replace(
      /[^0-9]/g,
      ""
    ).substring(2)}-${this.linha0000[7].replace(
      /[^0-9]/g,
      ""
    )}-${new Date().getTime()}.txt`;
    return `${nomeArquivo}`;
    // cria o nome do arquivo para
  }

  private converterArrayEmString(dadosArquivos: string[][]): string {
    return dadosArquivos.map((element) => element.join("|")).join("\r\n");
  }

  private async criaArquivoParaDownload(
    dirFile: string,
    stringArquivo: string
  ): Promise<string> {
    await fs.promises.writeFile(`${dirTemp}/${dirFile}`, stringArquivo);
    return dirFile;
  }

  public async retornaDirArquivo(): Promise<string> {
    const nomeFile: string = this.criaNomeArquivo();
    DeleteFile(nomeFile);
    return await this.criaArquivoParaDownload(nomeFile, this.stringArquivo);
  }
}
