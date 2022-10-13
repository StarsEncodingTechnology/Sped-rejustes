"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicadoController = void 0;
const core_1 = require("@overnightjs/core");
const logger_1 = __importDefault(require("@src/logger"));
const spedtxt_1 = require("@src/middleware/upload/spedtxt");
const criaArquivoParaDownload_1 = require("@src/services/criaArquivoParaDownload");
const RemoveDuplicados0150_1 = require("@src/services/RemoveDuplicados0150");
const multer_1 = __importDefault(require("multer"));
let DuplicadoController = class DuplicadoController {
    recebeSped(req, res) {
        res.render("duplicado");
    }
    async uploadSpedtxt(req, res) {
        console.log('aqui');
        if (req.file) {
            try {
                const removeDuplicados0150 = new RemoveDuplicados0150_1.RemoveDuplicados0150();
                const arrayFileFix = await removeDuplicados0150.normalizaTxt(req.file.destination, req.file.filename);
                const criaArquivoParaDownload = new criaArquivoParaDownload_1.CriaArquivoParaDownlaod(arrayFileFix);
                const nomeArquivo = await criaArquivoParaDownload.retornaDirArquivo();
                res.render("sucess", { linkArquivo: `/download/${nomeArquivo}` });
            }
            catch (e) {
                logger_1.default.error(e);
                res.render("failure", { motivo: e });
            }
        }
        else {
            logger_1.default.error("Arquivo invalido");
            res.render("failure", { motivo: "Possivelmente arquivo invalido" });
        }
    }
};
__decorate([
    (0, core_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DuplicadoController.prototype, "recebeSped", null);
__decorate([
    (0, core_1.Post)(""),
    (0, core_1.Middleware)((0, multer_1.default)(spedtxt_1.imputFileMiddleware.getConfig).single("imputTxt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DuplicadoController.prototype, "uploadSpedtxt", null);
DuplicadoController = __decorate([
    (0, core_1.Controller)("duplicado")
], DuplicadoController);
exports.DuplicadoController = DuplicadoController;
//# sourceMappingURL=duplicado.js.map