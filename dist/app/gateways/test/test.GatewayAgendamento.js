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
const Agendamento_1 = __importDefault(require("../../../domain/models/Agendamento"));
const agendamentos = [
    new Agendamento_1.default('agendamentoId', 'usuarioId', new Date())
];
class GatewayAgendamento {
    criarAgendamento(agendamento) {
        return __awaiter(this, void 0, void 0, function* () {
            return agendamento;
        });
    }
    listarAgendamentosComFiltro(filtro) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new Array;
            agendamentos.forEach(a => {
                if (a.id === filtro.id || !filtro.id
                    && a.usuarioId === filtro.usuarioId || !filtro.usuarioId
                    && (a.dataMarcada === filtro.dataMarcada || !filtro.dataMarcada)) {
                    data.push(a);
                }
            });
            return data;
        });
    }
}
exports.default = GatewayAgendamento;
