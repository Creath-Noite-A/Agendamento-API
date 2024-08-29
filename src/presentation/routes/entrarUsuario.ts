import express, { Request, Response, Router } from "express";

import EntrarUsuario from "../../app/usecases/EntrarUsuario";
import GatewayUsuario from "../../app/gateways/supabase.GatewayUsuario";

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const entrarUsuario = new EntrarUsuario(gatewayUsuario);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { telefone, senha } = req.body;

    const usuarioFetch = await entrarUsuario.execute({ telefone, senha });

    res.status(200).json(usuarioFetch);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

export default router;
