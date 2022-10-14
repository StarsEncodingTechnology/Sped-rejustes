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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicadoController = void 0;
const core_1 = require("@overnightjs/core");
const spedtxt_1 = require("@src/middleware/upload/spedtxt");
let DuplicadoController = class DuplicadoController {
    recebeSped(req, res) {
        res.render("duplicado");
    }
    async uploadSpedtxt(req, res) {
        res.send("33");
        console.log({ reqFile: req.files || 'null' });
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
    (0, core_1.Middleware)(spedtxt_1.txtUpload),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DuplicadoController.prototype, "uploadSpedtxt", null);
DuplicadoController = __decorate([
    (0, core_1.Controller)("duplicado")
], DuplicadoController);
exports.DuplicadoController = DuplicadoController;
//# sourceMappingURL=duplicado.js.map