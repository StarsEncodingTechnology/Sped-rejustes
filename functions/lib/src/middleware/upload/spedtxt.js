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
exports.txtUpload = void 0;
const os_1 = __importDefault(require("os"));
const busboy_1 = __importDefault(require("busboy"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
async function txtUpload(req, _, next) {
    const busboy = (0, busboy_1.default)({
        headers: req.headers,
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    });
    const fields = {};
    const tempdir = path_1.default.resolve(os_1.default.tmpdir());
    busboy.on("field", (key, value) => {
        fields[key] = value;
    });
    busboy.on("file", async (name, stream, info) => {
        const { filename, encoding, mimeType } = info;
        console.log({ mimeType });
        const nameFile = `spedajustes${Date.now().toString()}`;
        const filePath = path_1.default.join(tempdir, `${nameFile}.txt`);
        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);
        new Promise((resolve, rejects) => {
            stream.on("end", () => writeStream.end());
            writeStream.on("finish", () => {
                fs.readFile(filePath, (err, buffer) => {
                    const size = Buffer.byteLength(buffer);
                    if (err)
                        return rejects(err);
                    req.files = [
                        {
                            fieldname: name,
                            originalName: filename,
                            encoding: encoding,
                            mimeType: mimeType,
                            buffer: buffer,
                            size: size,
                        },
                    ];
                    try {
                        fs.unlinkSync(filePath);
                    }
                    catch (err) {
                        return rejects(err);
                    }
                    return resolve();
                });
            });
        })
            .then(() => {
            req.body = fields;
            return next();
        })
            .catch((e) => {
            console.log("DENTRO:" + e);
        });
    });
    busboy.on("error", (error) => {
        console.log("TESAIJ: " + error);
        return next();
    });
    return busboy.end(req.rawBody);
}
exports.txtUpload = txtUpload;
//# sourceMappingURL=spedtxt.js.map