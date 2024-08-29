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
const supabase_GatewayUsuario_1 = __importDefault(require("../app/gateways/supabase.GatewayUsuario"));
const EntrarUsuario_1 = __importDefault(require("../app/usecases/EntrarUsuario"));
dotenv_1.default.config({ path: "./.env" });
const tokenSecretKey = process.env.TOKEN_SECRET_KEY || "belo barbeiro";
if (!process.env.TOKEN_SECRET_KEY) {
    console.log('AVISO: a chave secreta não foi carregada do arquivo ".env", uma padrão foi posta por hardcoding');
}
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield req.cookies.access_token;
        console.log(token);
        if (!token) {
            throw new Error("Token de acesso nulo");
        }
        const verif = jsonwebtoken_1.default.verify(token, tokenSecretKey);
        req.body = verif;
        next();
    }
    catch (err) {
        res.status(401).send("É necessária autenticação ");
    }
});
exports.auth = auth;
const genToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telefone, senha } = req.body;
        if (telefone == null || senha == null) {
            throw new Error("Parâmetros nulos na pesquisa de usuário");
        }
        const gatewayUsuario = new supabase_GatewayUsuario_1.default();
        const entrarUsuario = new EntrarUsuario_1.default(gatewayUsuario);
        const usuario = yield entrarUsuario.execute({ telefone, senha });
        if (usuario == null || !usuario.pronto()) {
            throw new Error("Usuário nulo");
        }
        const { id, nome } = usuario;
        const token = jsonwebtoken_1.default.sign({ id, telefone, nome }, tokenSecretKey, {
            expiresIn: 60000 * 10, // <- 10 minutos
        });
        if (token == null) {
            throw new Error("Token nulo na geração de token");
        }
        res
            .cookie("access_token", token, {
            httpOnly: false,
            secure: false,
        })
            .status(200)
            .json({
            message: "Login efetuado com sucesso",
            data: usuario,
            error: false,
        });
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ error: false, message: err.message });
        }
        else {
            return res
                .status(500)
                .json({ error: false, message: "Erro desconhecido" });
        }
    }
});
exports.genToken = genToken;
