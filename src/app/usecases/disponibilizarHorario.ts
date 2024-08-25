import Horario from "../../domain/models/horario";
import IGatewayHorario from "../gateways/interfaces/IGatewayHorario";

export default class DisponibilizarHorario {
    private gateway: IGatewayHorario;

    constructor(gateway: IGatewayHorario) {
        this.gateway = gateway;
    }

    async execute(dadosHorario: {
        dia: number,
        hora: number,
        minutos: number
    }): Promise<Horario> {
        const { dia, hora, minutos } = dadosHorario;

        if(!dia || !hora || !minutos) {
            throw new TypeError('Erro: Parâmetro(s) nulo(s)');
        }

        return await this.gateway.gerarHorario(
            new Horario(dia, hora, minutos)
        );
    }
}