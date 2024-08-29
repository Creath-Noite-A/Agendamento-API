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
const Agendamento_1 = __importDefault(require("../../domain/models/Agendamento"));
const Horario_1 = __importDefault(require("../../domain/models/Horario"));
class CriarAgendamento {
    constructor(gatewayUsuario, gatewayHorario, gatewayAgendamento) {
        this.gatewayUsuario = gatewayUsuario;
        this.gatewayHorario = gatewayHorario;
        this.gatewayAgendamento = gatewayAgendamento;
    }
    execute(dadosUsuario, dadosAgendamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dataMarcada } = dadosAgendamento;
            const { telefone } = dadosUsuario;
            if (!telefone || !dataMarcada) {
                throw new TypeError("Erro: Parâmetro(s) nulo(s)");
            }
            const usuario = yield this.gatewayUsuario.pesquisarUsuarioPorTelefone(telefone);
            if (!usuario.id) {
                throw new Error("Erro: não foi possível criar agendamento com tal usuário");
            }
            if (dataMarcada.getTime() < Date.now() ||
                (dataMarcada.getTime() - Date.now()) / (1000 * 60 * 60 * 24) >= 14) {
                throw new Error("Data indisponível");
            }
            if (!(yield this.gatewayAgendamento.verificarDataMarcada(dataMarcada))) {
                throw new Error("Data já marcada por outro cliente");
            }
            if (!(yield this.gatewayHorario.verificarHorario(new Horario_1.default(null, dataMarcada.getDay(), dataMarcada.getHours(), dataMarcada.getMinutes())))) {
                throw new Error("Data indisponível");
            }
            const id = (0, uuid_1.v4)();
            return yield this.gatewayAgendamento.criarAgendamento(new Agendamento_1.default(id, usuario.id, dataMarcada));
        });
    }
}
exports.default = CriarAgendamento;
