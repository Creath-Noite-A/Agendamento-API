import express, { Request, Response, Router } from "express";

import CriarAgendamento from "../../app/usecases/CriarAgendamento";
import GatewayUsuario from "../../app/gateways/supabase.GatewayUsuario";
import GatewayHorario from "../../app/gateways/supabase.GatewayHorario";
import GatewayAgendamento from "../../app/gateways/supabase.GatewayAgendamento";

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const gatewayAgendamento = new GatewayAgendamento();
const gatewayHorario = new GatewayHorario();

const criarAgendamento = new CriarAgendamento(
  gatewayUsuario,
  gatewayHorario,
  gatewayAgendamento
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { telefone, dataMarcada } = req.body;

    const agendamentoCriado = await criarAgendamento.execute({
      telefone,
      dataMarcada,
    });

    res.status(201).json({
      message: "Agendamento criado com sucesso",
      data: agendamentoCriado,
      error: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: true, message: error.message });
    } else {
      res.status(500).json({ error: true, message: "Erro desconhecido" });
    }
  }
});

export default router;
