"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imputFileMiddleware = void 0;
const mime_types_1 = __importDefault(require("mime-types"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("@src/logger"));
const deleteFile_1 = require("@src/util/deleteFile");
const resolvePath = path_1.default.resolve(__dirname + "../../../");
const dirTemp = path_1.default.join(resolvePath, "temp");
class UploadSpedtxt {
    URL = dirTemp;
    constructor() { }
    storage() {
        console.log('dentro do multer 0');
        return multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                console.log("DENTRO DO MULTER 1");
                if (!fs_1.default.existsSync(this.URL)) {
                    fs_1.default.mkdirSync(this.URL);
                }
                cb(null, this.URL);
            },
            filename: (req, file, cb) => {
                console.log("DENTRO DO MULTER 2");
                const type = mime_types_1.default.extension(file.mimetype);
                const fileNameTemp = `${new Date().getTime()}.${type}`;
                logger_1.default.info(`Salvando arquivo: ${fileNameTemp}`);
                (0, deleteFile_1.DeleteFile)(`${fileNameTemp}`, 5000);
                cb(null, `${fileNameTemp}`);
            },
        });
    }
    fileFilter() {
        console.log("DENTRO DO MULTER 3: " + dirTemp);
        return (_, file, cb) => {
            console.log("dentro do multer 3.1");
            const type = mime_types_1.default.extension(file.mimetype);
            console.log("dentro do multer 3.2");
            const conditions = ["txt"];
            if (conditions.includes(`${type}`)) {
                console.log("dentro do multer 3.3");
                cb(null, true);
            }
            console.log("dentro do multer 3.4");
            cb(null, false);
        };
    }
    get getConfig() {
        console.log("DENTRO DO MULTER 4: " + resolvePath);
        return {
            storage: this.storage(),
            fileFilter: this.fileFilter(),
        };
    }
}
exports.imputFileMiddleware = new UploadSpedtxt();
//# sourceMappingURL=spedtxt.js.map