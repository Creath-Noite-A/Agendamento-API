import express, { Request, Response, Router } from "express";

import ListarHorarios from "../../app/usecases/ListarHorarios";
import GatewayHorario from "../../app/gateways/supabase.GatewayHorario";

const router = Router();
const gatewayHorario = new GatewayHorario();
const listarHorarios = new ListarHorarios(gatewayHorario);

router.get("/", async (req: Request, res: Response) => {
  try {
    const horarioCriado = await listarHorarios.execute();

    res.status(200).json(horarioCriado);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

export default router;
