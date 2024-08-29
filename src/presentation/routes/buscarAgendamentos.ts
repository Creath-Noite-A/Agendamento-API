import express, { Request, Response, Router } from "express";

import BuscarAgendamentos from "../../app/usecases/BuscarAgendamentos";
import GatewayUsuario from "../../app/gateways/supabase.GatewayUsuario";
import GatewayAgendamento from "../../app/gateways/supabase.GatewayAgendamento";

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const gatewayAgendamento = new GatewayAgendamento();

const buscarAgendamentos = new BuscarAgendamentos(
  gatewayAgendamento,
  gatewayUsuario
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { telefone } = req.body;

    const queryAgendamento = await buscarAgendamentos.execute({ telefone });

    res.status(200).json(queryAgendamento);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

export default router;
