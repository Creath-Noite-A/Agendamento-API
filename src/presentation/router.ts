import { Router } from "express";

import root from "./routes/root";
import buscarAgendamentos from "./routes/buscarAgendamentos";
import criarAgendamento from "./routes/criarAgendamento";
import criarHorario from "./routes/criarHorario";
import criarUsuario from "./routes/criarUsuario";
import entrarUsuario from "./routes/entrarUsuario";
import listarHorarios from "./routes/listarHorarios";
import { auth } from "../infra/middleware.tokenAuth";

const router = Router();

// Root page
router.use("/", root);

// Buscar Agendamento
router.use("/api/buscarAgendamentos", auth, buscarAgendamentos);

// Criar Agendamento
router.use("/api/criarAgendamento", auth, criarAgendamento);

// Criar Horário
router.use("/api/criarHorario", auth, criarHorario);

// Criar Usuário
router.use("/api/criarUsuario", criarUsuario);

// Entrar Usuário
router.use("/api/entrarUsuario", entrarUsuario);

// Listar Horários
router.use("/api/listarHorarios", auth, listarHorarios);

export default router;
