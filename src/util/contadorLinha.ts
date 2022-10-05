export interface InterfaceTotalLinha {
  [key: string]: number;
}

export class ContadorLinhas {
  private totalLinhas: InterfaceTotalLinha = {};
  private totalLinhasBloco: InterfaceTotalLinha = {};
  private numeroTotalLinhas: number = 0;
  // declara global
  constructor() {}

  public contaLinhas(spedArray: string[][]) {
    spedArray.forEach((element: string[]) => {
      // passa por todo o documento
      const key: string = element[1] as string;
      this.incrementaDecrementaLinha(key, 1);
    });
  }

  public incrementaDecrementaLinha(keyLinha: string, valor: number = 1): void {
    if (!this.totalLinhas[keyLinha]) this.totalLinhas[keyLinha] = 0;
    if (!this.totalLinhasBloco[keyLinha[0]])
      this.totalLinhasBloco[keyLinha[0]] = 0;

    this.totalLinhasBloco[keyLinha[0]] =
      this.totalLinhasBloco[keyLinha[0]] + valor;

    this.totalLinhas[keyLinha] = this.totalLinhas[keyLinha] + valor;

    this.numeroTotalLinhas = this.numeroTotalLinhas + valor;
  }

  get retornaTotalLinhas(): InterfaceTotalLinha {
    return this.totalLinhas;
  }

  get retornaTotalLinhasBloco(): InterfaceTotalLinha {
    return this.totalLinhasBloco;
  }
  get retornaNumero(): number {
    return this.numeroTotalLinhas;
  }
}
