"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Definindo as rotas
app.use('/api', usuarioRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
