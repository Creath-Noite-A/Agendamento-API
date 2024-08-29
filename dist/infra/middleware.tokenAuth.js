"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = exports.auth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: "./.env" });
const tokenSecretKey = process.env.TOKEN_SECRET_KEY || "belo barbeiro";
if (!process.env.TOKEN_SECRET_KEY) {
    console.log('AVISO: a chave secreta não foi carregada do arquivo ".env", uma padrão foi posta por hardcoding');
}
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Token de acesso nulo");
        }
        const verif = jsonwebtoken_1.default.verify(token, tokenSecretKey);
        req.token = verif;
    }
    catch (err) {
        res.status(401).send("É necessária autenticação");
    }
});
exports.auth = auth;
const genToken = (dadosUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, telefone, nome } = dadosUsuario;
        if (id == null || telefone == null || nome == null) {
            throw new Error("Dados nulos na geração de token");
        }
        const token = jsonwebtoken_1.default.sign({ id, telefone, nome }, tokenSecretKey, {
            expiresIn: 60000 * 10, // <- 10 minutos
        });
        if (token == null) {
            throw new Error("Token nulo na geração de token");
        }
        const retorno = {
            usuario: {
                id,
                telefone,
                nome,
            },
            token,
            status: 200,
        };
        return retorno;
    }
    catch (err) {
        return {
            usuario: null,
            token: null,
            status: 500,
        };
    }
});
exports.genToken = genToken;
