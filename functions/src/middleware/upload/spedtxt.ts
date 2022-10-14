import { NextFunction, Request, Response } from "express";
import os from "os";
import Busboy from "busboy";
import path, { resolve } from "path";
import internal from "stream";
import * as fs from "fs";
import logger from "@src/logger";
import { rejects } from "assert";

interface interfaceFields {
  [key: string]: string;
}

interface interfaceArrayFiles {
  fieldname: string;
  originalName: string;
  encoding: string;
  mimeType: string;
  buffer: Buffer;
  size: number;
}

interface interfaceRequest extends Request {
  files?: interfaceArrayFiles[];
  rawBody?: Buffer;
  // não sei muito bem oque ele é mas ta ae né
}

export async function txtUpload(
  req: interfaceRequest,
  _: Response,
  next: NextFunction
): Promise<Busboy.Busboy | void> {
  const busboy: Busboy.Busboy = Busboy({
    headers: req.headers,
    limits: {
      // Cloud functions impose this restriction anyway
      fileSize: 10 * 1024 * 1024,
    },
  });

  const fields: interfaceFields = {};

  const tempdir = path.resolve(os.tmpdir());

  busboy.on("field", (key, value) => {
    fields[key] = value;
  });

  busboy.on(
    "file",
    async (name: string, stream: internal.Readable, info: Busboy.FileInfo) => {
      // console.log({ name, stream, info });
      const { filename, encoding, mimeType } = info;

      console.log({ mimeType });

      const nameFile: string = `spedajustes${Date.now().toString()}`;
      const filePath: string = path.join(tempdir, `${nameFile}.txt`);
      
      const writeStream: fs.WriteStream = fs.createWriteStream(filePath);
      stream.pipe(writeStream);

      new Promise<void>((resolve, rejects) => {
        stream.on("end", () => writeStream.end());
        writeStream.on("finish", () => {
          fs.readFile(filePath, (err, buffer: Buffer) => {
            const size: number = Buffer.byteLength(buffer);
            if (err) return rejects(err);

            req.files = [
              {
                fieldname: name,
                originalName: filename,
                encoding: encoding,
                mimeType: mimeType,
                buffer: buffer,
                size: size,
              },
            ];

            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              return rejects(err);
            }
            return resolve();
          });
        });
      })
        .then(() => {
          req.body = fields;
          return next();
        })
        .catch((e) => {
          console.log("DENTRO:" + e);
        });
    }
  );

  busboy.on("error", (error) => {
    console.log("TESAIJ: " + error);
    return next();
  });

  
  return busboy.end(req.rawBody);

  // busboy.on("finish", () => {});

  // req.pipe(busboy);  

  // return req.pipe(busboy);
}
