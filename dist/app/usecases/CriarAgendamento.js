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
class CriarAgendamento {
    constructor(gatewayUsuario, gatewayAgendamento) {
        this.gatewayUsuario = gatewayUsuario;
        this.gatewayAgendamento = gatewayAgendamento;
    }
    execute(dadosUsuario, dadosAgendamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dataMarcada } = dadosAgendamento;
            const { telefone } = dadosUsuario;
            if (!telefone || !dataMarcada) {
                throw new TypeError('Erro: Parâmetro(s) nulo(s)');
            }
            const usuarioId = yield this.gatewayUsuario.pesquisarUsuarioIdPorTelefone(telefone);
            if (!usuarioId) {
                throw new Error('Erro: não foi possível criar agendamento com tal usuário');
            }
            const id = (0, uuid_1.v4)();
            return yield this.gatewayAgendamento.criarAgendamento(new Agendamento_1.default(id, usuarioId, dataMarcada));
        });
    }
}
exports.default = CriarAgendamento;
