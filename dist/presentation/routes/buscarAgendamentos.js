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
const express_1 = require("express");
const BuscarAgendamentos_1 = __importDefault(require("../../app/usecases/BuscarAgendamentos"));
const supabase_GatewayUsuario_1 = __importDefault(require("../../app/gateways/supabase.GatewayUsuario"));
const supabase_GatewayAgendamento_1 = __importDefault(require("../../app/gateways/supabase.GatewayAgendamento"));
const router = (0, express_1.Router)();
const gatewayUsuario = new supabase_GatewayUsuario_1.default();
const gatewayAgendamento = new supabase_GatewayAgendamento_1.default();
const buscarAgendamentos = new BuscarAgendamentos_1.default(gatewayAgendamento, gatewayUsuario);
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telefone } = req.body;
        const queryAgendamento = yield buscarAgendamentos.execute({ telefone });
        res.status(200).json(queryAgendamento);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Erro desconhecido" });
        }
    }
}));
exports.default = router;
