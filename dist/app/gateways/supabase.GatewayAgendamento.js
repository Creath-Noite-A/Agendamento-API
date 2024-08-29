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
const Agendamento_1 = __importDefault(require("../../domain/models/Agendamento"));
const client_Supabase_1 = require("../../infra/client.Supabase");
class GatewayAgendamento {
    criarAgendamento(agendamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, usuarioId, dataMarcada } = agendamento;
            const dataRegistro = (dataMarcada === null || dataMarcada === void 0 ? void 0 : dataMarcada.toLocaleDateString()) +
                " " +
                (dataMarcada === null || dataMarcada === void 0 ? void 0 : dataMarcada.toLocaleTimeString());
            console.log(dataRegistro);
            if (dataRegistro == null) {
                throw new TypeError("Não foi possível converter Date para Timezone na conexão com o banco de dados");
            }
            const { data, error } = yield client_Supabase_1.supabase
                .from("agendamentos")
                .insert([{ id, usuarioId, dataMarcada: dataRegistro }]);
            if (error) {
                throw new Error(`Erro ao marcar agendamento: ${error.message}`);
            }
            return agendamento;
        });
    }
    buscarAgendamentosPorUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield client_Supabase_1.supabase
                .from("agendamentos")
                .select("*")
                .eq("usuarioId", usuario.id);
            if (error) {
                throw new Error(`Erro ao buscar agendamentos ${error.message}`);
            }
            return data.map((item) => new Agendamento_1.default(item.id, usuario.id, new Date(item.dataMarcada)));
        });
    }
    verificarDataMarcada(dataMarcada) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRegistro = (dataMarcada === null || dataMarcada === void 0 ? void 0 : dataMarcada.toLocaleDateString()) +
                " " +
                (dataMarcada === null || dataMarcada === void 0 ? void 0 : dataMarcada.toLocaleTimeString());
            console.log(dataRegistro);
            if (dataRegistro == null) {
                throw new TypeError("Não foi possível converter Date para Timezone na conexão com o banco de dados");
            }
            const { data, error } = yield client_Supabase_1.supabase
                .from("agendamentos")
                .select("id")
                .eq("dataMarcada", dataRegistro);
            if (error) {
                throw new Error(`Erro ao buscar agendamentos ${error.message}`);
            }
            return data.length === 0;
        });
    }
}
exports.default = GatewayAgendamento;
