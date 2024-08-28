"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gatewayUsuarioSupabase_1 = __importDefault(require("../../app/gateways/gatewayUsuarioSupabase"));
const autenticarUsuario_1 = __importDefault(require("../../app/usecases/autenticarUsuario"));
const router = express_1.default.Router();
const autenticarUsuario = new autenticarUsuario_1.default(new gatewayUsuarioSupabase_1.default());
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telefone, senha } = req.body;
        const token = yield autenticarUsuario.execute({ telefone, senha });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Erro ao autenticar o usuário.' });
    }
}));
exports.default = router;
