import express, { Request, Response, Router } from 'express';
import CriarUsuario from '../../app/usecases/criarUsuario';
import GatewayUsuario from '../../app/gateways/GatewayUsuario';

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const criarUsuario = new CriarUsuario(gatewayUsuario);

router.use(express.json());

router.post('/usuario', async (req: Request, res: Response) => {
    try {
        const { id, telefone, nome, senha } = req.body;

        const usuarioCriado = await criarUsuario.execute({ id, telefone, nome, senha });

        res.status(201).json(usuarioCriado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
});

export default router;