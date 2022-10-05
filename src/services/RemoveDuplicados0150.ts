import logger from "@src/logger";
import { ContadorLinhas, InterfaceTotalLinha } from "@src/util/contadorLinha";
import ReadTxt from "@src/util/readtxt";

interface InterfaceChaveValor {
  [key: string]: string;
}

export class RemoveDuplicados0150 {
  constructor() {}

  public async normalizaTxt(dir: string, file: string): Promise<string[][]> {
    // iniciando normalização de dados
    const linhasTxt = await ReadTxt.readFile(`${dir}/${file}`);
    return this.removeDuplicados(linhasTxt);
  }

  private removeDuplicados(linhasTxt: string[][]): string[][] {
    let jaAconteceu: InterfaceChaveValor = {};
    // variavel para saber se participantes já está cadastrado

    let indexDuplicados: number[] = [];
    //

    let duplicadosParaAconteceu: InterfaceChaveValor = {};


    for (let prop in linhasTxt) {
      const element = linhasTxt[prop];
      if (element[1] == "0150") {
        if (jaAconteceu[element[5]]) {
          indexDuplicados.push(parseInt(prop));

          duplicadosParaAconteceu[element[2]] = jaAconteceu[element[5]];
        } else {
          jaAconteceu[element[5]] = element[2];
        }
      }
    }

    return this.removeLinhaDuplicada(
      this.ajustaNotas(linhasTxt, duplicadosParaAconteceu),
      indexDuplicados
    );
  }

  private ajustaNotas(
    linhasTxt: string[][],
    duplicadosParaAconteceu: InterfaceChaveValor
  ): string[][] {
    return linhasTxt.map((element) => {
      if (element[1] == "D100" || element[1] == "C100")
        if (duplicadosParaAconteceu[element[4]])
          element[4] = duplicadosParaAconteceu[element[4]];

      return element;
    });
  }

  private removeLinhaDuplicada(
    linhasTxt: string[][],
    duplicados: number[]
  ): string[][] {
    const totalLinhas = new ContadorLinhas();

    let valorFinal: string[][] = [];

    for (let prop in linhasTxt) {
      const element: string[] = linhasTxt[prop];
      if (element[1] == "9001") break;

      if (duplicados.includes(parseInt(prop)) || element[1].length != 4) {
        continue;
      }

      totalLinhas.incrementaDecrementaLinha(element[1]);

      const listaLinhasContemNumero = [
        "0990",
        "C990",
        "D990",
        "G990",
        "H990",
        "K990",
        "1990",
      ];
      if (listaLinhasContemNumero.includes(element[1]))
        element[2] = this.editaLinha(element[1], totalLinhas);

      valorFinal.push(element);
    }

    return valorFinal.concat(this.buildBloco9(totalLinhas));
  }

  private editaLinha(linhaKey: string, totalLinhas: ContadorLinhas): string {
    return totalLinhas.retornaTotalLinhasBloco[linhaKey[0]].toString();
  }

  public buildBloco9(totalLinhas: ContadorLinhas): string[][] {
    const totalLinhas9900: InterfaceTotalLinha = totalLinhas.retornaTotalLinhas;

    let bloco9: string[][] = [["", "9001", "0", ""]];
    totalLinhas.incrementaDecrementaLinha("9001");
    console.log(totalLinhas9900);

    for (let prop in totalLinhas9900) {
      bloco9.push(["", "9900", `${prop}`, `${totalLinhas9900[prop]}`, ""]);
      totalLinhas.incrementaDecrementaLinha("9900");
    }

    // preenche final bloco 9
    totalLinhas.incrementaDecrementaLinha("9900");
    bloco9.push(["", "9900", "9990", "1", ""]);
    totalLinhas.incrementaDecrementaLinha("9900");
    bloco9.push(["", "9900", "9999", "1", ""]);
    totalLinhas.incrementaDecrementaLinha("9900");
    bloco9.push([
      "",
      "9900",
      "9900",
      `${totalLinhas.retornaTotalLinhas["9900"]}`,
      "",
    ]);

    totalLinhas.incrementaDecrementaLinha("9990");
    totalLinhas.incrementaDecrementaLinha("9999");
    bloco9.push([
      "",
      "9990",
      `${totalLinhas.retornaTotalLinhasBloco["9"]}`,
      "",
    ]);
    bloco9.push(["", "9999", `${totalLinhas.retornaNumero.toString()}`, ""]);

    // fim preenche bloco 9
    return bloco9;
  }
}
