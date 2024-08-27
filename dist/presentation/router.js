"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const criarAgendamento_1 = __importDefault(require("./routes/criarAgendamento"));
const criarHorario_1 = __importDefault(require("./routes/criarHorario"));
const criarUsuario_1 = __importDefault(require("./routes/criarUsuario"));
exports.default = {
    criarAgendamento: criarAgendamento_1.default,
    criarHorario: criarHorario_1.default,
    criarUsuario: criarUsuario_1.default
};
