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
const ListarHorarios_1 = __importDefault(require("../../app/usecases/ListarHorarios"));
const supabase_GatewayHorario_1 = __importDefault(require("../../app/gateways/supabase.GatewayHorario"));
const router = (0, express_1.Router)();
const gatewayHorario = new supabase_GatewayHorario_1.default();
const listarHorarios = new ListarHorarios_1.default(gatewayHorario);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const horarioLista = yield listarHorarios.execute();
        res.status(200).json({
            message: "Requisição de lista feita com sucesso",
            data: horarioLista,
            error: false,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: true, message: error.message });
        }
        else {
            res.status(500).json({ error: true, message: "Erro desconhecido" });
        }
    }
}));
exports.default = router;
