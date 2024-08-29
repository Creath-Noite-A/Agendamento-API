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
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_1 = __importDefault(require("../../domain/models/Usuario"));
class CriarUsuario {
    constructor(gateway) {
        this.gateway = gateway;
    }
    execute(dadosUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, nome, senha } = dadosUsuario;
            if (telefone == null || nome == null || senha == null) {
                throw new Error("Todos os campos são obrigatórios.");
            }
            if (telefone.length != 11) {
                throw new Error("Número de telefone inválido");
            }
            if (isNaN(Number(telefone)) || !Number.isInteger(Number(telefone))) {
                throw new Error("Número de telefone deve conter somente dígitos");
            }
            const _nome = nome.trim();
            if (_nome.length < 2) {
                throw new Error("Nome muito curto");
            }
            if (_nome.length > 16) {
                throw new Error("Reduza um pouco do nome");
            }
            if (!/^[A-Za-záàâãéèêíïóôõöúüçñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÇÑ ]+$/.test(_nome)) {
                throw new Error("Nome deve conter somente caracteres padrão");
            }
            if (senha.length < 8) {
                throw new Error("A senha deve conter no mínimo 8 caracteres");
            }
            if (senha.length > 16) {
                throw new Error("A senha deve conter no máximo 16 caracteres");
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{8,16}$/.test(senha)) {
                throw new Error("A senha deve conter ao menos 1 letra maiúscula, " +
                    "1 letra minúscula e 1 dígito (permitidos alguns caracteres especiais)");
            }
            const id = (0, uuid_1.v4)();
            const senhaHash = yield bcrypt_1.default.hash(senha, 10);
            return yield this.gateway.cadastrarUsuario(new Usuario_1.default(null, telefone, null, senha));
        });
    }
}
exports.default = CriarUsuario;
