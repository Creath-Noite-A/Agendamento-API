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
const client_Supabase_1 = require("../../infra/client.Supabase");
class GatewayAgendamento {
    criarAgendamento(agendamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, usuarioId, dataMarcada } = agendamento;
            const { data, error } = yield client_Supabase_1.supabase
                .from('agendamentos')
                .insert([{ id, usuarioId, dataMarcada }]);
            if (error) {
                throw new Error(`Erro ao marcar agendamento: ${error.message}`);
            }
            return agendamento;
        });
    }
    listarAgendamentosComFiltro(agendamento) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Array();
        });
    }
}
exports.default = GatewayAgendamento;
