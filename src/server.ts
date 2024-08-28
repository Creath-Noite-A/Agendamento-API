import express from 'express';
import dotenv from 'dotenv';

import session from 'express-session';

import { v4 } from 'uuid';

import router from './presentation/router';

dotenv.config({ path: './.env' });

const app = express();

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: true,
        maxAge: 60000 * 10
    }
}));

app.use('/', router);

// App port e listen

const PORT = process.env.PORT || 3000;

if(!process.env.PORT) {
    throw new Error('Erro: arquivo \".env\" não encontrado na root do projeto');
}
else {
    app.listen(PORT, () => {
        // http://localhost:{PORT GOES HERE}
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}