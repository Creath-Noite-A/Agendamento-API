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
const usuario_1 = __importDefault(require("../../domain/models/usuario"));
class CriarUsuario {
    constructor(gatewayUsuario) {
        this.gatewayUsuario = gatewayUsuario;
    }
    execute(dadosUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, nome, senha } = dadosUsuario;
            if (!telefone || !nome || !senha) {
                throw new Error('Todos os campos são obrigatórios.');
            }
            const novoUsuario = new usuario_1.default(telefone, nome, senha);
            const usuarioCriado = yield this.gatewayUsuario.cadastrarUsuario(novoUsuario);
            return usuarioCriado;
        });
    }
}
exports.default = CriarUsuario;
