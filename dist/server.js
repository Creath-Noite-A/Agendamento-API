"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const router_1 = __importDefault(require("./presentation/router"));
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: true,
        maxAge: 60000 * 10
    }
}));
app.use('/', router_1.default);
// App port e listen
const PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
    throw new Error('Erro: arquivo \".env\" não encontrado na root do projeto');
}
else {
    app.listen(PORT, () => {
        // http://localhost:{PORT GOES HERE}
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
