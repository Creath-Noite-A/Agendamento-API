import express, { Request, Response, Router } from "express";

import CriarHorario from "../../app/usecases/CriarHorario";
import GatewayHorario from "../../app/gateways/supabase.GatewayHorario";

const router = Router();
const gatewayHorario = new GatewayHorario();
const criarHorario = new CriarHorario(gatewayHorario);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { dia, hora, minutos } = req.body;

    const horarioCriado = await criarHorario.execute({ dia, hora, minutos });

    res.status(201).json({
      message: "Horário criado com sucesso",
      data: horarioCriado,
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
