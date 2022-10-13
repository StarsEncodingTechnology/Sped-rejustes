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
Object.defineProperty(exports, "__esModule", { value: true });
const RemoveDuplicados0150_1 = require("@src/services/RemoveDuplicados0150");
const fs = __importStar(require("fs"));
const path_1 = require("path");
class ReadTxt {
    static convertFileEmArray(file) {
        const arrayLinha = file.split(/\r\n|\n|\r/gm);
        const arrayFinal = arrayLinha.map((element) => {
            return element.split("|");
        });
        return arrayFinal;
    }
    static async readFile(dirFile) {
        if (dirFile.slice(dirFile.length - 4) != ".txt") {
            throw new RemoveDuplicados0150_1.ArquivoNaoValidoError("Arquivo de formato invalido");
        }
        else {
            const file = await fs.promises.readFile((0, path_1.join)(dirFile), "utf-8");
            return this.convertFileEmArray(file);
        }
    }
}
exports.default = ReadTxt;
//# sourceMappingURL=readtxt.js.map