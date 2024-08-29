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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_1 = __importDefault(require("../../domain/models/Usuario"));
class EntrarUsuario {
    constructor(gateway) {
        this.gateway = gateway;
    }
    execute(dadosUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, senha } = dadosUsuario;
            if (telefone == null || senha == null) {
                throw new Error("Todos os campos são obrigatórios.");
            }
            if (telefone.length != 11) {
                throw new Error("Número de telefone inválido");
            }
            if (isNaN(Number(telefone)) || !Number.isInteger(Number(telefone))) {
                throw new Error("Número de telefone deve conter somente dígitos");
            }
            if (senha.length < 8) {
                throw new Error("Senhas contém no mínimo 8 caracteres");
            }
            if (senha.length > 16) {
                throw new Error("Senhas contém no máximo 16 caracteres");
            }
            const resul = yield this.gateway.pesquisarUsuarioPorTelefone(telefone);
            if (!resul) {
                throw new Error("Credenciais inválidas");
            }
            if (!resul.senha) {
                throw new Error("Erro desconhecido");
            }
            if (!(yield bcrypt_1.default.compare(senha, resul.senha))) {
                throw new Error("Credenciais inválidas");
            }
            return yield new Usuario_1.default(resul.id, telefone, resul.nome, senha);
        });
    }
}
exports.default = EntrarUsuario;
