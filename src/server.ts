import express from 'express';
import dotenv from 'dotenv';

import router from './presentation/router';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());

// Criação de usuário
app.use('/api', router.criarUsuario);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});