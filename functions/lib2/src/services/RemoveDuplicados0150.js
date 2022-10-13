"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveDuplicados0150 = exports.ArquivoNaoValidoError = void 0;
const logger_1 = __importDefault(require("@src/logger"));
const contadorLinha_1 = require("@src/util/contadorLinha");
const internal_error_1 = require("@src/util/errors/internal-error");
const readtxt_1 = __importDefault(require("@src/util/readtxt"));
class ArquivoNaoValidoError extends internal_error_1.InternalError {
    constructor(message) {
        const internalError = "Erro quando o arquivo não é valido: " + message;
        super(internalError);
    }
}
exports.ArquivoNaoValidoError = ArquivoNaoValidoError;
class RemoveDuplicados0150 {
    validacaoLinhas = [
        "0000",
        "0001",
        "0150",
        "9999",
        "0990",
        "C990",
        "D990",
        "E990",
        "G990",
        "H990",
        "K990",
        "1990",
        "9990",
    ];
    constructor() { }
    async normalizaTxt(dir, file) {
        const linhasTxt = await readtxt_1.default.readFile(`${dir}/${file}`);
        this.validaFile(linhasTxt);
        logger_1.default.info(`A empresa que está sendo alterado: ${linhasTxt[0][6]}, ` +
            `--- CNPJ: ${linhasTxt[0][8]} --- data: ${linhasTxt[0][5]}`);
        return this.removeDuplicados(linhasTxt);
    }
    validaFile(linhasTxt) {
        let capturaLinhas = [];
        for (let prop in linhasTxt) {
            const element = linhasTxt[prop][1];
            if (this.validacaoLinhas.includes(element) &&
                !capturaLinhas.includes(element))
                capturaLinhas.push(element);
            if (linhasTxt[prop][1] == "9999")
                break;
        }
        if (this.validacaoLinhas.length == capturaLinhas.length)
            return true;
        throw new ArquivoNaoValidoError("Linhas faltantes - " +
            this.validacaoLinhas.filter((element) => !capturaLinhas.includes(element)));
    }
    removeDuplicados(linhasTxt) {
        let jaAconteceu = {};
        let indexDuplicados = [];
        let duplicadosParaAconteceu = {};
        for (let prop in linhasTxt) {
            const element = linhasTxt[prop];
            if (element[1] == "0990")
                break;
            if (element[1] == "0150") {
                if (jaAconteceu[element[5]]) {
                    indexDuplicados.push(parseInt(prop));
                    duplicadosParaAconteceu[element[2]] = jaAconteceu[element[5]];
                }
                else {
                    jaAconteceu[element[5]] = element[2];
                }
            }
        }
        return this.removeLinhaDuplicada(this.ajustaNotas(linhasTxt, duplicadosParaAconteceu), indexDuplicados);
    }
    removeLinhaDuplicada(linhasTxt, duplicados) {
        const totalLinhas = new contadorLinha_1.ContadorLinhas();
        let valorFinal = [];
        for (let prop in linhasTxt) {
            const element = linhasTxt[prop];
            if (element[1] == "9001")
                break;
            if (duplicados.includes(parseInt(prop)) || element[1].length != 4) {
                continue;
            }
            totalLinhas.incrementaDecrementaLinha(element[1]);
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
            if (listaLinhasContemNumero.includes(element[1]))
                element[2] = this.editaLinha(element[1], totalLinhas);
            valorFinal.push(element);
        }
        return valorFinal.concat(this.buildBloco9(totalLinhas));
    }
    ajustaNotas(linhasTxt, duplicadosParaAconteceu) {
        return linhasTxt.map((element) => {
            if (element[1] == "D100" || element[1] == "C100")
                if (duplicadosParaAconteceu[element[4]])
                    element[4] = duplicadosParaAconteceu[element[4]];
            return element;
        });
    }
    editaLinha(linhaKey, totalLinhas) {
        return totalLinhas.retornaTotalLinhasBloco[linhaKey[0]].toString();
    }
    buildBloco9(totalLinhas) {
        const totalLinhas9900 = totalLinhas.retornaTotalLinhas;
        let bloco9 = [["", "9001", "0", ""]];
        totalLinhas.incrementaDecrementaLinha("9001");
        const keysOrdenadas = this.ordenaKeysPadrao9000(Object.keys(totalLinhas9900));
        for (let prop in keysOrdenadas) {
            const nomeDalinha = keysOrdenadas[prop];
            bloco9.push([
                "",
                "9900",
                `${nomeDalinha}`,
                `${totalLinhas9900[nomeDalinha]}`,
                "",
            ]);
            totalLinhas.incrementaDecrementaLinha("9900");
        }
        totalLinhas.incrementaDecrementaLinha("9900", 5);
        bloco9.push(["", "9900", "9990", "1", ""], ["", "9900", "9999", "1", ""], ["", "9900", "9900", `${totalLinhas.retornaTotalLinhas["9900"] - 2}`, ""], ["", "9990", `${totalLinhas.retornaTotalLinhasBloco["9"]}`, ""], ["", "9999", `${totalLinhas.retornaNumero.toString()}`, ""]);
        return bloco9;
    }
    ordenaKeysPadrao9000(keys) {
        const keysBloco0 = keys
            .filter((element) => element[0] == "0")
            .sort();
        const keysBloco1 = keys
            .filter((element) => element[0] == "1")
            .sort();
        const keysBloco9 = keys
            .filter((element) => element[0] == "9")
            .sort();
        const keysblocoL = keys
            .filter((element) => element[0] != "0" && element[0] != "1" && element[0] != "9")
            .sort();
        return keysBloco0.concat(keysblocoL, keysBloco1, keysBloco9);
    }
}
exports.RemoveDuplicados0150 = RemoveDuplicados0150;
//# sourceMappingURL=RemoveDuplicados0150.js.map