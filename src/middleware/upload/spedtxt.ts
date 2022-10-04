//Importaremos para realizar o Upload
import mime from "mime-types";
import multer from "multer";

//Ajudará no caminho para guardar nossa imagem
import path from "path";

//Criara nossa pasta para armazenar nossos arquivos caso não exista
import fs from "fs";

import { Request } from "express";
import logger from "@src/logger";

const resolvePath = path.resolve("src");
const dirTemp = path.join(resolvePath, "temp");

class UploadSpedtxt {
  //Pasta para onde será feito o Upload
  private URL: string = dirTemp;

  constructor() {}

  private deleteFile(fileName: String): void {
    setTimeout(() => {
      fs.unlink(`${dirTemp}/${fileName}`, (err) => {
        if (err) logger.error("deletando arquivo: " + err);
        logger.info(`Arquivo deletado: ${fileName}`);
      });
    }, 10000);
  }

  //Methodo onde armazenaremos nossos arquivos
  private storage(): multer.StorageEngine {
    /*
      Essa configuração irá nos ajudar
      1 - O destino do arquivo 
      2 - E o nome do arquivo
    */
    return multer.diskStorage({
      //Criar o destino do arquivo
      destination: (req, file, cb) => {
        //Verifica se não existe o diretório
        if (!fs.existsSync(this.URL)) {
          //Efetua a criação do diretório caso ele não exista
          fs.mkdirSync(this.URL);
        }
        //Define o caminho da pasta
        cb(null, this.URL);
      },
      //Renomeia o arquivo
      filename: (req, file, cb) => {
        //Aqui vamos usar o mime-type para chegar o tipo do arquivo
        //E predefinir como ele veio até nosso sistema
        const type = mime.extension(file.mimetype);

        //Renomeia o nome do arquivo
        //Aqui temos o nome do arquivo gerado pelo Date
        //E colocamos a extensão dele de acordo com o mime-type

        const fileNameTemp: String = `${new Date().getTime()}.${type}`
        logger.info(`Salvando arquivo: ${fileNameTemp}`);
        this.deleteFile(`${fileNameTemp}`);
        cb(null, `${fileNameTemp}`);
      },
    });
  }

  //Methodo onde iremos efetuar o filtro de arquivos
  //Se é valido ou não
  private fileFilter() {
    /*
      Essa configuração vai nos ajudar com 
      1 - A validação do arquivo
    */
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      //Utilizaremos a Lib mime-types para identificar o tipo do arquivo
      const type = mime.extension(file.mimetype);

      const conditions = ["txt"];

      //Perguntamos se existe algum desses valores no type
      if (conditions.includes(`${type}`)) {
        //Caso exista, teremos nossa imagem linda maravilhosa
        cb(null, true);
      }

      //Caso não de certo a validação não efetuaremos o upload
      cb(null, false);
    };
  }

  //Configuração que usaremos em nossas rotas como Middleware
  get getConfig(): multer.Options {
    /*
      Essa configuração vai nos ajudar com 
      1 - A compor as configs do Multer como Middleware em nossas rotas
      2 - Não será um middleware global e sim para usos unicos e comportamentais
    */
    return {
      //Storage serve para compor a config do multer destination e filename
      storage: this.storage(),
      //FileFilter serve para validar o filtro de arquivos
      fileFilter: this.fileFilter(),
    };
  }
}

export const imputFileMiddleware = new UploadSpedtxt();
