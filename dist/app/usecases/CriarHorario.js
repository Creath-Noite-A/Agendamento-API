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
const uuid_1 = require("uuid");
const Horario_1 = __importDefault(require("../../domain/models/Horario"));
class CriarHorario {
    constructor(gateway) {
        this.gateway = gateway;
    }
    execute(dadosHorario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dia, hora, minutos } = dadosHorario;
            if (dia == null || hora == null || minutos == null) {
                throw new TypeError("Erro: Parâmetro(s) nulo(s)");
            }
            const id = (0, uuid_1.v4)();
            return yield this.gateway.gerarHorario(new Horario_1.default(id, dia, hora, minutos));
        });
    }
}
exports.default = CriarHorario;
