import logger from "@src/logger";
import { ContadorLinhas, InterfaceTotalLinha } from "@src/util/contadorLinha";
import { InternalError } from "@src/util/errors/internal-error";
import ReadTxt from "@src/util/readtxt";

interface InterfaceChaveValor {
  [key: string]: string;
}

export class ArquivoNaoValidoError extends InternalError {
  constructor(message: string) {
    const internalError = "Erro quando o arquivo não é valido: " + message;
    super(internalError);
  }
}

export class RemoveDuplicados0150 {
  readonly validacaoLinhas: string[] = [
    "0000",
    "0001",
    "0150",
    "9999",
    "0990",
    // LB990
    // B não é obrigatorio
    "C990",
    "D990",
    "E990",
    "G990",
    "H990",
    "K990",
    "1990",
    "9990",
  ];

  constructor() {}

  public async normalizaTxt(dir: string, file: string): Promise<string[][]> {
    // iniciando normalização de dados
    const linhasTxt = await ReadTxt.readFile(`${dir}/${file}`);

    this.validaFile(linhasTxt);

    logger.info(
      `A empresa que está sendo alterado: ${linhasTxt[0][6]}, ` +
        `--- CNPJ: ${linhasTxt[0][8]} --- data: ${linhasTxt[0][5]}`
    );
    return this.removeDuplicados(linhasTxt);
  }

  public validaFile(linhasTxt: string[][]): boolean {
    let capturaLinhas: string[] = [];
    for (let prop in linhasTxt) {
      const element = linhasTxt[prop][1];
      if (
        this.validacaoLinhas.includes(element) &&
        !capturaLinhas.includes(element)
      )
      // caso esteja incluido e já n tenha cido capturado
        capturaLinhas.push(element);
      if (linhasTxt[prop][1] == "9999") break;
      // na ultima linha para
    }

    if (this.validacaoLinhas.length == capturaLinhas.length) return true;
    throw new ArquivoNaoValidoError(
      "Linhas invalidas - " +
        this.validacaoLinhas.filter(
          (element) => !capturaLinhas.includes(element)
        )
        // lança erro contendo as linhas que faltam
    );
  }

  private removeDuplicados(linhasTxt: string[][]): string[][] {
    let jaAconteceu: InterfaceChaveValor = {};
    // variavel para saber se participantes já está cadastrado
    let indexDuplicados: number[] = [];
    // variavel que vai armazenar as linhas 0150 que estão repetidas
    let duplicadosParaAconteceu: InterfaceChaveValor = {};
    // variavel que vai receber a key como o codigo do participante e element cnpj

    for (let prop in linhasTxt) {
      // for que percorre todas as linhas
      const element = linhasTxt[prop];
      // para falicitar separa o elemento
      if (element[1] == "0990") break;
      // ao checar no final do bloco zero BREAK codigo

      if (element[1] == "0150") {
        if (jaAconteceu[element[5]]) {
          // caso já tenha acontecido
          indexDuplicados.push(parseInt(prop));
          // adiciona aos index que já foram duplicados

          duplicadosParaAconteceu[element[2]] = jaAconteceu[element[5]];
          // adiciona CNPJ ao elemento de key codigo produto
        } else {
          jaAconteceu[element[5]] = element[2];
          // caso não tenha acontecido armazena valor
        }
      }
    }

    return this.removeLinhaDuplicada(
      this.ajustaNotas(linhasTxt, duplicadosParaAconteceu),
      indexDuplicados
    );
  }

  private removeLinhaDuplicada(
    linhasTxt: string[][],
    duplicados: number[]
  ): string[][] {
    const totalLinhas = new ContadorLinhas();
    // new obj que conta as notas

    let valorFinal: string[][] = [];

    for (let prop in linhasTxt) {
      // passara pelas linhas
      const element: string[] = linhasTxt[prop];
      if (element[1] == "9001") break;
      // caso chegue na linha de iniciou do bloco 9001
      // BREAK code

      if (duplicados.includes(parseInt(prop)) || element[1].length != 4) {
        continue;
        // caso seja um dos duplicados Pula
      }

      totalLinhas.incrementaDecrementaLinha(element[1]);
      // incrementa valor

      const listaLinhasContemNumero = [
        "0990",
        "B090",
        "C990",
        "D990",
        "E990",
        "G990",
        "H990",
        "K990",
        "1990",
      ];
      // lista de linhas que contém o total do bloco

      if (listaLinhasContemNumero.includes(element[1]))
        element[2] = this.editaLinha(element[1], totalLinhas);

      valorFinal.push(element);
    }

    return valorFinal.concat(this.buildBloco9(totalLinhas));
    // concatena linhas gerais + linhas do bloco 9
  }

  private ajustaNotas(
    linhasTxt: string[][],
    duplicadosParaAconteceu: InterfaceChaveValor
  ): string[][] {
    return linhasTxt.map((element) => {
      // passa por todas as linhas em busca
      if (element[1] == "D100" || element[1] == "C100")
        if (duplicadosParaAconteceu[element[4]])
          element[4] = duplicadosParaAconteceu[element[4]];
      // caso seja uma nota ele checa se é uma duplicada
      // se sim altera codigo do participante

      return element;
    });
  }

  private editaLinha(linhaKey: string, totalLinhas: ContadorLinhas): string {
    return totalLinhas.retornaTotalLinhasBloco[linhaKey[0]].toString();
  }

  private buildBloco9(totalLinhas: ContadorLinhas): string[][] {
    const totalLinhas9900: InterfaceTotalLinha = totalLinhas.retornaTotalLinhas;
    // encurta codigo

    let bloco9: string[][] = [["", "9001", "0", ""]];
    totalLinhas.incrementaDecrementaLinha("9001");
    // adiciona a abertura do bloco 9

    const keysOrdenadas = this.ordenaKeysPadrao9000(
      Object.keys(totalLinhas9900)
    );
    // ordena keys do objet

    for (let prop in keysOrdenadas) {
      // for nas keys ordenadas
      const nomeDalinha = keysOrdenadas[prop];
      // separa key
      bloco9.push([
        "",
        "9900",
        `${nomeDalinha}`,
        `${totalLinhas9900[nomeDalinha]}`,
        "",
      ]);
      totalLinhas.incrementaDecrementaLinha("9900");
    }

    // preenche final bloco 9
    totalLinhas.incrementaDecrementaLinha("9900", 5);
    // são 5 linha que são adicionadas

    bloco9.push(
      ["", "9900", "9990", "1", ""],
      ["", "9900", "9999", "1", ""],
      ["", "9900", "9900", `${totalLinhas.retornaTotalLinhas["9900"] - 2}`, ""],
      // retirando 2 do contador que são as duas linhas abaixo
      ["", "9990", `${totalLinhas.retornaTotalLinhasBloco["9"]}`, ""],
      ["", "9999", `${totalLinhas.retornaNumero.toString()}`, ""]
    );

    return bloco9;
  }

  private ordenaKeysPadrao9000(keys: string[]): string[] {
    const keysBloco0: string[] = keys
      .filter((element) => element[0] == "0")
      .sort();
    const keysBloco1: string[] = keys
      .filter((element) => element[0] == "1")
      .sort();

    const keysBloco9: string[] = keys
      .filter((element) => element[0] == "9")
      .sort();

    const keysblocoL: string[] = keys
      .filter(
        (element) => element[0] != "0" && element[0] != "1" && element[0] != "9"
      )
      .sort();

    // filtra keys e ordena

    return keysBloco0.concat(keysblocoL, keysBloco1, keysBloco9);
    // concatena na ordem do arquivo
  }
}
