import logger from "@src/logger";
import * as fs from "fs";
import path from "path";

const resolvePath = path.resolve(__dirname + "../../");
const dirTemp = path.join(resolvePath, "temp");

export function DeleteFile(fileName: String, timeDelete: number = 30000): void {
  setTimeout(() => {
    fs.unlink(`${dirTemp}/${fileName}`, (err) => {
      if (err) logger.error("deletando arquivo: " + err);
      logger.info(`Arquivo deletado: ${fileName}`);
    });
  }, timeDelete);
}
