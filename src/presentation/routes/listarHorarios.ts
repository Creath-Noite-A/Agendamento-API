import express, { Request, Response, Router } from "express";

import ListarHorarios from "../../app/usecases/ListarHorarios";
import GatewayHorario from "../../app/gateways/supabase.GatewayHorario";

const router = Router();
const gatewayHorario = new GatewayHorario();
const listarHorarios = new ListarHorarios(gatewayHorario);

router.get("/", async (req: Request, res: Response) => {
  try {
    const horarioLista = await listarHorarios.execute();

    res.status(200).json({
      message: "Requisição de lista feita com sucesso",
      data: horarioLista,
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
