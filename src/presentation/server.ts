import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});