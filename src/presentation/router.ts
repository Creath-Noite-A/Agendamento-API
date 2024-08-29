import { Router } from "express";

import root from "./routes/root";
import buscarAgendamentos from "./routes/buscarAgendamentos";
import criarAgendamento from "./routes/criarAgendamento";
import criarHorario from "./routes/criarHorario";
import criarUsuario from "./routes/criarUsuario";
import entrarUsuario from "./routes/entrarUsuario";
import listarHorarios from "./routes/listarHorarios";

const router = Router();

// Root page
router.use("/", root);

// Buscar Agendamento
router.use("/api/buscarAgendamentos", buscarAgendamentos);

// Criar Agendamento
router.use("/api/criarAgendamento", criarAgendamento);

// Criar Horário
router.use("/api/criarHorario", criarHorario);

// Criar Usuário
router.use("/api/criarUsuario", criarUsuario);

// Entrar Usuário
router.use("/api/entrarUsuario", entrarUsuario);

// Listar Horários
router.use("/api/listarHorarios", listarHorarios);

router.get("/api/endpoint", (req, res) => {
  res.send("Hello World");
});

export default router;
