import express, { Request, Response, Router } from 'express';

import CriarAgendamento from '../../app/usecases/CriarAgendamento';
import GatewayUsuario from '../../app/gateways/supabase.GatewayUsuario';
import GatewayAgendamento from '../../app/gateways/supabase.GatewayAgendamento';

const router = Router();
const gatewayUsuario = new GatewayUsuario();
const gatewayAgendamento = new GatewayAgendamento();
const criarAgendamento = new CriarAgendamento(gatewayUsuario, gatewayAgendamento);

router.use(express.json());

router.post('/', async (req: Request, res: Response) => {
    try {
        const { telefone, dataMarcada } = req.body;
        
        const agendamentoCriado = await criarAgendamento.execute(
            { telefone },
            { dataMarcada }
        );

        res.status(201).json(agendamentoCriado);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});

export default router;