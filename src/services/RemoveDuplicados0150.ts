import logger from "@src/logger";
import { ContadorLinhas } from "@src/util/contadorLinha";
import ReadTxt from "@src/util/readtxt";

interface interfaceJaAconteceu {
  [key: string]: string;
}

export class RemoveDuplicados0150 {
  constructor() {}

  public async normalizaTxt(dir: string, file: string): Promise<string[][]> {
    const linhasTxt = await ReadTxt.readFile(`${dir}/${file}`);

    return this.removeDuplicados(linhasTxt);
  }

  private removeDuplicados(linhasTxt: string[][]): string[][] {
    let jaAconteceu: interfaceJaAconteceu = {};
    let duplicados: object[] = [];
    let duplicadosParaAconteceu: interfaceJaAconteceu = {};

    for (let prop in linhasTxt) {
      const element = linhasTxt[prop];
      if (element[1] == "0150") {
        if (jaAconteceu[element[5]]) {
          duplicados.push({
            prop,
            codigoParticiparte: element[2],
            codigoDestino: jaAconteceu[element[5]],
          });

          duplicadosParaAconteceu[element[2]] = jaAconteceu[element[5]];
        } else {
          jaAconteceu[element[5]] = element[2];
        }
      }
    }

    console.log({jaAconteceu, duplicados, duplicadosParaAconteceu})

    return []//this.removeDuplicados(this.ajustaNotas(linhasTxt, duplicadosParaAconteceu), );
  }

  private ajustaNotas(
    linhasTxt: string[][],
    duplicadosParaAconteceu: interfaceJaAconteceu
  ): string[][] {
    return linhasTxt.map((element) => {
      if (element[1] == "D100" || element[1] == "C100")
        if (duplicadosParaAconteceu[element[4]])
          element[4] = duplicadosParaAconteceu[element[4]];

      return element;
    });
  }

    // private removeLinhaDuplicada(linhasTxt: string[][],): string[][]{
    //   let linhasTxtFinal: string[][] = []
    // }
}
