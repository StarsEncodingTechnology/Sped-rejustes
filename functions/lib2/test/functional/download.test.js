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
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
describe("Testes download", () => {
    const arquivos = ["test-download-correto"];
    afterAll(async () => {
        const resolvePath = path_1.default.resolve("src");
        const dirTemp = path_1.default.join(resolvePath, "temp");
        for (let prop in arquivos) {
            try {
                fs.promises.unlink(`${dirTemp}/${arquivos[prop]}`);
            }
            catch (e) { }
        }
    });
    it("Deve retornar o download correto", async () => {
        const resolvePath = path_1.default.resolve("src");
        const dirTemp = path_1.default.join(resolvePath, "temp");
        const fileName = arquivos[0];
        await fs.promises.writeFile(`${dirTemp}/${fileName}`, "TESTE-deve retornar o download");
        const response = await global.testRequest.get(`/download/${fileName}`);
        expect(response.headers["content-disposition"]).toEqual('attachment; filename="test-download-correto"');
    });
    it("Deve retornar error um erro caso Download expirado", async () => {
        const response = await global.testRequest.get("/download/test-download-expirado");
        expect(response.text).toEqual(expect.stringContaining("Download expirado"));
    });
});
//# sourceMappingURL=download.test.js.map