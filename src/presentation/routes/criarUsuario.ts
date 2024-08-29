import express, { Request, Response, Router } from "express";

import CriarUsuario from "../../app/usecases/CriarUsuario";
import GatewayUsuario from "../../app/gateways/supabase.GatewayUsuario";

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const criarUsuario = new CriarUsuario(gatewayUsuario);

router.use(express.json());

router.post("/", async (req: Request, res: Response) => {
  try {
    const { telefone, nome, senha } = req.body;

    const usuarioCriado = await criarUsuario.execute({ telefone, nome, senha });

    res.status(201).json(usuarioCriado);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

export default router;
