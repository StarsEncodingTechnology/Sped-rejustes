"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dadosSemDuplicados_json_1 = __importDefault(require("@test/fixtures/dadosSemDuplicados.json"));
const criaArquivoParaDownload_1 = require("../criaArquivoParaDownload");
describe("Teste para cria arquivo para download", () => {
    it("deve retornar o valor correto", async () => {
        const arrayString = Array.from(dadosSemDuplicados_json_1.default);
        const criaArquivoParaDownload = new criaArquivoParaDownload_1.CriaArquivoParaDownlaod(arrayString);
        expect(await criaArquivoParaDownload.retornaDirArquivo()).toEqual(expect.stringContaining((arrayString[0][7]).replace(/[^0-9]/g, '')));
    });
});
//# sourceMappingURL=criaArquivoParaDownload.test.js.map