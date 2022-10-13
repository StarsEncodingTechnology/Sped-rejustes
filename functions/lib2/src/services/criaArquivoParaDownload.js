"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriaArquivoParaDownlaod = void 0;
const deleteFile_1 = require("@src/util/deleteFile");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const resolvePath = path_1.default.resolve(__dirname + "../../");
const dirTemp = path_1.default.join(resolvePath, "temp");
class CriaArquivoParaDownlaod {
    stringArquivo = "";
    linha0000 = [];
    constructor(dadosArquivo) {
        this.stringArquivo = this.converterArrayEmString(dadosArquivo);
        this.linha0000 = dadosArquivo[0];
    }
    criaNomeArquivo() {
        const nomeArquivo = `${this.linha0000[5]
            .replace(/[^0-9]/g, "")
            .substring(2)}-${this.linha0000[7].replace(/[^0-9]/g, "")}-${new Date().getTime()}.txt`;
        return `${nomeArquivo}`;
    }
    converterArrayEmString(dadosArquivos) {
        return dadosArquivos.map((element) => element.join("|")).join("\r\n");
    }
    async criaArquivoParaDownload(dirFile, stringArquivo) {
        await fs.promises.writeFile(`${dirTemp}/${dirFile}`, stringArquivo);
        return dirFile;
    }
    async retornaDirArquivo() {
        const nomeFile = this.criaNomeArquivo();
        (0, deleteFile_1.DeleteFile)(nomeFile);
        return await this.criaArquivoParaDownload(nomeFile, this.stringArquivo);
    }
}
exports.CriaArquivoParaDownlaod = CriaArquivoParaDownlaod;
//# sourceMappingURL=criaArquivoParaDownload.js.map