import { Router } from 'express';

import criarAgendamento from './routes/criarAgendamento';
import criarHorario from './routes/criarHorario';
import criarUsuario from './routes/criarUsuario';

const router = Router();

// Default page
router.get('/', (req, res) => {
    // :)
    console.log(req.session);
    console.log(req.session.id);
    res.send(
        '<h1>Creath Seletiva</h1>' +
        '<p style="color: red">Agendamento API!!! 🕺💃</p>'
    );
});

// Criar Horário
router.use('/api/criarHorario', criarHorario);

// Criar Usuário
router.use('/api/criarUsuario', criarUsuario);

export default router;