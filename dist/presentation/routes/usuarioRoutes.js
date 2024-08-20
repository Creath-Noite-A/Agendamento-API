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
const criarUsuario_1 = __importDefault(require("../../app/usecases/criarUsuario"));
const gatewayUsuarioSupabase_1 = __importDefault(require("../../app/gateways/gatewayUsuarioSupabase"));
const router = express_1.default.Router();
const gatewayUsuarioSupabase = new gatewayUsuarioSupabase_1.default();
const criarUsuario = new criarUsuario_1.default(gatewayUsuarioSupabase);
router.use(express_1.default.json());
router.post('/usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, telefone, nome, senha } = req.body;
        const usuarioCriado = yield criarUsuario.execute({ id, telefone, nome, senha });
        res.status(201).json(usuarioCriado);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'Erro desconhecido' });
        }
    }
}));
exports.default = router;
