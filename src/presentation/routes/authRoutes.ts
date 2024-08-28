import express, { Request, Response } from 'express';
import gatewayUsuarioSupabase from '../../app/gateways/gatewayUsuarioSupabase';
import AutenticarUsuario from '../../app/usecases/autenticarUsuario';

const router = express.Router();
const autenticarUsuario = new AutenticarUsuario(new gatewayUsuarioSupabase());

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { telefone, senha } = req.body;
    const token = await autenticarUsuario.execute({ telefone, senha });
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Erro ao autenticar o usuário.' });
  }
});

export default router;