"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const RemoveDuplicados0150_1 = require("../RemoveDuplicados0150");
const dadosSemDuplicados_json_1 = __importDefault(require("@test/fixtures/dadosSemDuplicados.json"));
describe("RemoveDuplicados0150", () => {
    const resolvePath = path_1.default.resolve("test");
    it("deve retornar o txt normalizado CORRETO", async () => {
        console.log(resolvePath);
        const nameFile = "post_spedComDuplicados.txt";
        const removeDuplicados0150 = new RemoveDuplicados0150_1.RemoveDuplicados0150();
        const response = await removeDuplicados0150.normalizaTxt(resolvePath + "/fixtures/", nameFile);
        const respostaCorreta = Array.from(dadosSemDuplicados_json_1.default);
        expect(response).toEqual(respostaCorreta);
    });
    it("deve retornar um erro caso arquivo incompleto", async () => {
        const nameFile = "spedFaltandoPedaco.txt";
        const removeDuplicados0150 = new RemoveDuplicados0150_1.RemoveDuplicados0150();
        await expect(removeDuplicados0150.normalizaTxt((resolvePath + "/fixtures/"), nameFile)).rejects.toThrow("Erro quando o arquivo não é valido: Linhas faltantes - 9999,D990,E990,G990,H990,K990,1990,9990");
    });
    it("deve retornar um erro caso arquivo não seja da extensão correta", async () => {
        const nameFile = "ArquivoInvalido.json";
        const removeDuplicados0150 = new RemoveDuplicados0150_1.RemoveDuplicados0150();
        await expect(removeDuplicados0150.normalizaTxt((resolvePath + "/fixtures/"), nameFile)).rejects.toThrow("Erro quando o arquivo não é valido: Arquivo de formato invalido");
    });
});
//# sourceMappingURL=RemoveDuplicados0150.test.js.map