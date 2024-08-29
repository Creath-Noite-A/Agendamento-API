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
Object.defineProperty(exports, "__esModule", { value: true });
class BuscarAgendamento {
    constructor(gatewayAgendamento, gatewayUsuario) {
        this.gatewayAgendamento = gatewayAgendamento;
        this.gatewayUsuario = gatewayUsuario;
    }
    execute(dadosUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone } = dadosUsuario;
            if (telefone == null) {
                throw new Error("Erro: Parâmetro nulo");
            }
            const usuario = yield this.gatewayUsuario.pesquisarUsuarioPorTelefone(telefone);
            if (!usuario) {
                throw new Error("Usuário não encontrado");
            }
            return yield this.gatewayAgendamento.buscarAgendamentosPorUsuario(usuario);
        });
    }
}
exports.default = BuscarAgendamento;
