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
const supabaseClient_1 = require("../../infra/supabaseClient");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class GatewayUsuarioSupabase {
    cadastrarUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const senhaCriptografada = yield bcryptjs_1.default.hash(usuario.senha, 10);
            const { data, error } = yield supabaseClient_1.supabase
                .from('usuarios')
                .insert([
                { telefone: usuario.telefone, nome: usuario.nome, senha: senhaCriptografada }
            ])
                .single();
            if (error) {
                throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
            }
            return new usuario_1.default(data['telefone'], data['nome'], data['senha']);
        });
    }
    listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabaseClient_1.supabase
                .from('usuarios')
                .select('*');
            if (error) {
                throw new Error(`Erro ao listar usuários: ${error.message}`);
            }
            return data.map((item) => new usuario_1.default(item.telefone, item.nome, item.senha));
        });
    }
}
exports.default = GatewayUsuarioSupabase;
