import { NextFunction, Request, Response } from "express";
import Busboy from "busboy";
import os from "os";
import fs from "fs";
import internal from "stream";
import busboy from "busboy";
import path from "path";

interface interfaceFields {
  [key: string]: string;
}

interface interfaceArrayFiles {
  fieldname: string;
  originalName: string;
  encoding: string;
  mimeType: string;
  buffer: Buffer;
  size: number
}

interface interfaceRequest extends Request{
    files?: interfaceArrayFiles[];
    rawBody?: any
    // não sei muito bem oque ele é mas ta ae né
}

exports.txtUpload = function (
  req: interfaceRequest,
  res: Response,
  next: NextFunction
): void {
  const busboy: Busboy.Busboy = Busboy({
    headers: req.headers,
    limits: {
      // Cloud functions impose this restriction anyway
      fileSize: 10 * 1024 * 1024,
    },
  });

  const fields: interfaceFields = {};
  const files: interfaceArrayFiles[] = [];
  const fileWrites: Promise<any>[] = [];

  const tempdir = path.resolve(os.tmpdir());


  busboy.on("field", (key: string, value: string) => (fields[key] = value));

  busboy.on(
    "file",
    (
      fieldname: string,
      file: internal.Readable,
      fileDescript: busboy.FileInfo
    ) => {
      const {filename, encoding, mimeType } = fileDescript;
      if (filename.indexOf(".txt") == -1 || mimeType != "text/plain")
      {
        res.render("failure", {motivo: "Arquivo Invalido"});
        return
      }else if(files.length > 1){
        res.render("failure", {motivo: "Somente 1 arquivo por vez"});
      }else{
        const fileNameTemp: string = `ajustesped${new Date().getTime()}.txt'`;
        
        const filePath: string = path.join(`${tempdir}`, fileNameTemp)

        const writeStream: fs.WriteStream = fs.createWriteStream(filePath);
        file.pipe(writeStream);

        fileWrites.push(
          new Promise((resolve, reject) => {
            file.on("end", () => writeStream.end());
            writeStream.on("finish", () => {
              fs.readFile(filePath, (err, buffer) => {
                const size: number = Buffer.byteLength(buffer);
                if(err) return reject(err);

                files.push({
                  fieldname,
                  originalName: filename,
                  encoding,
                  mimeType,
                  buffer,
                  size
                })

                try{
                  fs.unlinkSync(filePath);
                }catch (error){
                  return reject(error);
                }

                resolve("CONCLUIDO");
              });
            });
            writeStream.on('error', reject);
          })
        )
      }
    }
  );

  busboy.on('finish', ()=>{
    Promise.all(fileWrites)
      .then(() => {
        req.body = fields;
        req.files = files;
      })
  });

  busboy.end(req.rawBody);

};
