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
const Usuario_1 = __importDefault(require("../../domain/models/Usuario"));
const client_Supabase_1 = require("../../infra/client.Supabase");
class GatewayUsuario {
    cadastrarUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, telefone, nome, senha } = usuario;
            const { data, error } = yield client_Supabase_1.supabase
                .from("usuarios")
                .insert([{ id, telefone, nome, senha }]);
            if (error) {
                throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
            }
            return usuario;
        });
    }
    listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield client_Supabase_1.supabase.from("usuarios").select("*");
            if (error) {
                throw new Error(`Erro ao listar usuários: ${error.message}`);
            }
            return data.map((item) => new Usuario_1.default(item.id, item.telefone, item.nome, item.senha));
        });
    }
    pesquisarUsuarioPorTelefone(telefone) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield client_Supabase_1.supabase
                .from("usuarios")
                .select()
                .is("telefone", telefone);
            if (error) {
                throw new Error(`Erro ao pesquisar id de usuário por telefone: ${error.message}`);
            }
            if (data.length > 1) {
                throw new Error(`Problema ao pesquisar usuário: id duplicado no banco de dados`);
            }
            const usuario = data[0];
            return new Usuario_1.default(usuario.id, usuario.telefone, usuario.nome, usuario.senha);
        });
    }
}
exports.default = GatewayUsuario;
