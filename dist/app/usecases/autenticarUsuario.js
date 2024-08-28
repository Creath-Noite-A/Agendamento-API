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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class autenticarUsuario {
    constructor(gatewayUsuario) {
        this.gatewayUsuario = gatewayUsuario;
    }
    execute(dadosLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, senha } = dadosLogin;
            if (!telefone || !senha) {
                throw new Error('Telefone e senha são obrigatórios.');
            }
            const usuarios = yield this.gatewayUsuario.listarUsuarios();
            const usuario = usuarios.find(u => u.telefone === telefone);
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(senha, usuario.senha);
            if (!isPasswordValid) {
                throw new Error('Senha incorreta.');
            }
            const token = jsonwebtoken_1.default.sign({ telefone: usuario.telefone }, 'seu_segredo_jwt', { expiresIn: '1h' });
            return token;
        });
    }
}
exports.default = autenticarUsuario;
