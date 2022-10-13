"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContadorLinhas = void 0;
class ContadorLinhas {
    totalLinhas = {};
    totalLinhasBloco = {};
    numeroTotalLinhas = 0;
    constructor() { }
    contaLinhas(spedArray) {
        spedArray.forEach((element) => {
            const key = element[1];
            this.incrementaDecrementaLinha(key, 1);
        });
    }
    incrementaDecrementaLinha(keyLinha, valor = 1) {
        if (!this.totalLinhas[keyLinha])
            this.totalLinhas[keyLinha] = 0;
        if (!this.totalLinhasBloco[keyLinha[0]])
            this.totalLinhasBloco[keyLinha[0]] = 0;
        this.totalLinhasBloco[keyLinha[0]] =
            this.totalLinhasBloco[keyLinha[0]] + valor;
        this.totalLinhas[keyLinha] = this.totalLinhas[keyLinha] + valor;
        this.numeroTotalLinhas = this.numeroTotalLinhas + valor;
    }
    get retornaTotalLinhas() {
        return this.totalLinhas;
    }
    get retornaTotalLinhasBloco() {
        return this.totalLinhasBloco;
    }
    get retornaNumero() {
        return this.numeroTotalLinhas;
    }
}
exports.ContadorLinhas = ContadorLinhas;
//# sourceMappingURL=contadorLinha.js.map