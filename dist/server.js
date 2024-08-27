"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./presentation/router"));
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
// Requests
app.get('/', (req, res) => {
    // :)
    res.send('<h1>Creath Seletiva</h1>' +
        '<p style="color: red">Agendamento API!!! 🕺💃</p>');
});
app.use('/criarHorario', router_1.default.criarHorario);
app.use('/criarUsuario', router_1.default.criarUsuario);
// App port e listen
const PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
    throw new Error('Erro: arquivo \".env\" não encontrado na root do projeto');
}
else {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
