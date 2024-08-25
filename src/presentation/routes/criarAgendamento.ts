import express, { Request, Response, Router } from 'express';

import CriarAgendamento from '../../app/usecases/criarAgendamento';
import GatewayUsuario from '../../app/gateways/supabase.GatewayUsuario';
import GatewayAgendamento from '../../app/gateways/supabase.GatewayAgendamento';

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const gatewayAgendamento = new GatewayAgendamento();
const criarAgendamento = new CriarAgendamento(gatewayUsuario, gatewayAgendamento);

router.use(express.json());

router.post('/criarAgendamento', async (req: Request, res: Response) => {
    try {
        const { dataMarcada } = req.body;
        
        /*
        const agendamentoCriado = await criarAgendamento.execute(
            usuario,
            { dataMarcada }
        );
        */

        res.status(201).json();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
});

export default router;