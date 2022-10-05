export interface InterfaceTotalLinha {
  [key: string]: number;
}

export class ContadorLinhas {
  private totalLinhas: InterfaceTotalLinha = {};
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
    if (!this.totalLinhas[keyLinha]) {
      this.totalLinhas[keyLinha] = 0;
      console.log(keyLinha)
    }

    // console.log(keyLinha + " // " + this.totalLinhas[keyLinha]);
    this.totalLinhas[keyLinha] = this.totalLinhas[keyLinha] + valor;
  }

  get retornaTotalLinhas(): InterfaceTotalLinha {
    return this.totalLinhas;
  }
}
