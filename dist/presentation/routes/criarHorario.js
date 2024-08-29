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
const CriarHorario_1 = __importDefault(require("../../app/usecases/CriarHorario"));
const supabase_GatewayHorario_1 = __importDefault(require("../../app/gateways/supabase.GatewayHorario"));
const router = (0, express_1.Router)();
const gatewayHorario = new supabase_GatewayHorario_1.default();
const criarHorario = new CriarHorario_1.default(gatewayHorario);
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dia, hora, minutos } = req.body;
        const horarioCriado = yield criarHorario.execute({ dia, hora, minutos });
        res.status(201).json(horarioCriado);
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
