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
const Horario_1 = __importDefault(require("../../domain/models/Horario"));
const client_Supabase_1 = require("../../infra/client.Supabase");
class GatewayHorario {
    gerarHorario(horario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, dia, hora } = horario;
            const { data, error } = yield client_Supabase_1.supabase
                .from("horarios")
                .insert([{ id, dia, hora }]);
            if (error) {
                throw new Error(`Erro ao cadastrar horário: ${error.message}`);
            }
            return horario;
        });
    }
    verificarHorario(horario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dia, hora, minutos } = yield horario;
            const { data, error } = yield client_Supabase_1.supabase
                .from("horarios")
                .select("*")
                .eq("dia", dia)
                .eq("hora", hora)
                .eq("minutos", minutos);
            if (error) {
                throw new Error(`Erro ao verificar horário: ${error.message}`);
            }
            if (data.length > 0) {
                return true;
            }
            return false;
        });
    }
    listarHorarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield client_Supabase_1.supabase.from("horarios").select("*");
            if (error) {
                throw new Error(`Erro ao listar horários: ${error.message}`);
            }
            return data.map((item) => new Horario_1.default(item.id, item.dia, item.hora, item.minutos));
        });
    }
}
exports.default = GatewayHorario;
