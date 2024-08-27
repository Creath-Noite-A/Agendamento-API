import express, { Request, Response, Router } from 'express';

import CriarHorario from '../../app/usecases/CriarHorario';
import GatewayHorario from '../../app/gateways/supabase.GatewayHorario';

const router = Router();
const gatewayHorario = new GatewayHorario();
const criarHorario = new CriarHorario(gatewayHorario);

router.use(express.json());

router.post('/', async (req: Request, res: Response) => {
    try {
        const { dia, hora } = req.body;

        const horarioCriado = await criarHorario.execute(
            { dia, hora }
        );

        res.status(201).json(horarioCriado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});

export default router;