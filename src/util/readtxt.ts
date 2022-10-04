import * as fs from "fs";
import { join } from "path";

export default class ReadTxt {

  private static convertFileEmArray(file: string): string[][] {
    // faz conversão do string em array
    const arrayLinha = file.split("\r\n");
    
    const arrayFinal = arrayLinha.map((element) => {
      return element.split('|')
    })

    return arrayFinal;
  }

  
   public static async readFile(dirFile: string): Promise<string[][]> {
    const file = await fs.promises.readFile(join(dirFile), "utf-8");
    // faz a leitura do txt


    return this.convertFileEmArray(file);
  }
}
