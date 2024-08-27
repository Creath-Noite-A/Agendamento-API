import express from 'express';
import dotenv from 'dotenv';
import cookies from 'cookie-parser';
import session from 'express-session';

import router from './presentation/router';

dotenv.config({ path: './.env' });

const app = express();

// Requests

app.get('/', (req, res) => {
    // :)
    res.send(
        '<h1>Creath Seletiva</h1>' +
        '<p style="color: red">Agendamento API!!! 🕺💃</p>'
    );
});

app.use('/criarHorario', router.criarHorario);

app.use('/criarUsuario', router.criarUsuario);

// App port e listen

const PORT = process.env.PORT || 3000;

if(!process.env.PORT) {
    throw new Error('Erro: arquivo \".env\" não encontrado na root do projeto');
}
else {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}