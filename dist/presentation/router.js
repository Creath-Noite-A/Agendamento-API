"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const criarHorario_1 = __importDefault(require("./routes/criarHorario"));
const criarUsuario_1 = __importDefault(require("./routes/criarUsuario"));
const router = (0, express_1.Router)();
// Default page
router.get('/', (req, res) => {
    // :)
    console.log(req.session);
    console.log(req.session.id);
    res.send('<h1>Creath Seletiva</h1>' +
        '<p style="color: red">Agendamento API!!! 🕺💃</p>');
});
// Criar Horário
router.use('/api/criarHorario', criarHorario_1.default);
// Criar Usuário
router.use('/api/criarUsuario', criarUsuario_1.default);
exports.default = router;
