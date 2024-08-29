"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./presentation/router"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/", router_1.default);
// App port e listen
const PORT = process.env.PORT || 3000;
if (!process.env.PORT) {
    throw new Error('Erro: arquivo ".env" não encontrado na root do projeto');
}
else {
    app.listen(PORT, () => {
        // http://localhost:{PORT}
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}
