"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const root_1 = __importDefault(require("./routes/root"));
const buscarAgendamentos_1 = __importDefault(require("./routes/buscarAgendamentos"));
const criarAgendamento_1 = __importDefault(require("./routes/criarAgendamento"));
const criarHorario_1 = __importDefault(require("./routes/criarHorario"));
const criarUsuario_1 = __importDefault(require("./routes/criarUsuario"));
const entrarUsuario_1 = __importDefault(require("./routes/entrarUsuario"));
const listarHorarios_1 = __importDefault(require("./routes/listarHorarios"));
const middleware_tokenAuth_1 = require("../infra/middleware.tokenAuth");
const router = (0, express_1.Router)();
// Root page
router.use("/", root_1.default);
// Buscar Agendamento
router.use("/api/buscarAgendamentos", middleware_tokenAuth_1.auth, buscarAgendamentos_1.default);
// Criar Agendamento
router.use("/api/criarAgendamento", middleware_tokenAuth_1.auth, criarAgendamento_1.default);
// Criar Horário
router.use("/api/criarHorario", middleware_tokenAuth_1.auth, criarHorario_1.default);
// Criar Usuário
router.use("/api/criarUsuario", criarUsuario_1.default);
// Entrar Usuário
router.use("/api/entrarUsuario", entrarUsuario_1.default);
// Listar Horários
router.use("/api/listarHorarios", middleware_tokenAuth_1.auth, listarHorarios_1.default);
exports.default = router;
