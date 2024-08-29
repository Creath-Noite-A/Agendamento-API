import express, { Request, Response, Router } from "express";

import CriarUsuario from "../../app/usecases/CriarUsuario";
import GatewayUsuario from "../../app/gateways/supabase.GatewayUsuario";

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const criarUsuario = new CriarUsuario(gatewayUsuario);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { telefone, nome, senha } = req.body;

    await criarUsuario.execute({ telefone, nome, senha });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      data: { telefone, nome, senha },
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
