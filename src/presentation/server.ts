import express from 'express';
import dotenv from 'dotenv';

import usuarioRoutes from './routes/usuarioRoutes';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());

// Definindo as rotas
app.use('/api', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});