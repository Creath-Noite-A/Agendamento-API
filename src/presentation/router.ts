import { Router } from "express";

import root from "./routes/root";
import criarAgendamento from "./routes/criarAgendamento";
import criarHorario from "./routes/criarHorario";
import criarUsuario from "./routes/criarUsuario";

const router = Router();

// Root page
router.use("/", root);

// Criar Horário
router.use("/api/criarHorario", criarHorario);

// Criar Usuário
router.use("/api/criarUsuario", criarUsuario);

router.get("/endpoint", (req, res) => {
  res.send("Hello World");
});

export default router;
