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
const Horario_1 = __importDefault(require("../../../domain/models/Horario"));
const horarios = [
    new Horario_1.default('horarioId', 0, new Date())
];
class GatewayHorario {
    gerarHorario(horario) {
        return __awaiter(this, void 0, void 0, function* () {
            return horario;
        });
    }
    listarHorarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = horarios;
            return data.map((item) => new Horario_1.default(item.dia, item.hora, item.minutos));
        });
    }
}
exports.default = GatewayHorario;
