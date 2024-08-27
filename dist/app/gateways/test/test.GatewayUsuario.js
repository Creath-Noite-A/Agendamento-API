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
const Usuario_1 = __importDefault(require("../../../domain/models/Usuario"));
const usuarios = [
    new Usuario_1.default('usuarioId', '12345678901', 'Usuario', 'senha123')
];
class GatewayUsuario {
    cadastrarUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            usuarios.push(usuario);
            return usuario;
        });
    }
    loginUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, senha } = usuario;
            usuario = new Usuario_1.default(null, telefone, null, senha);
            usuarios.some((u) => {
                if (u.telefone === usuario.telefone) {
                    usuario.nome = u.nome;
                    usuario.id = u.id;
                    return true;
                }
            });
            if (!usuario.pronto()) {
                throw new Error('Erro: usuário não encontrado');
            }
            return usuario;
        });
    }
    listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = usuarios;
            return data.map((item) => new Usuario_1.default(item.id, item.telefone, item.nome, item.senha));
        });
    }
    pesquisarUsuarioIdPorTelefone(telefone) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = usuarios.find((usuario) => usuario.telefone === telefone);
            if (!usuario) {
                throw new Error('Erro: usuário não encontrado');
            }
            if (!usuario.id) {
                throw new Error('Erro: id de usuário é nulo');
            }
            return usuario.id;
        });
    }
}
exports.default = GatewayUsuario;
