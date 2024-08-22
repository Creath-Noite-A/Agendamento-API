import Horario from "../../domain/models/horario";
import IGatewayHorario from "../gateways/IGatewayHorario";

export default class GerarHorario {
    private gateway: IGatewayHorario;

    constructor(gateway: IGatewayHorario) {
        this.gateway = gateway;
    }

    async execute(dadosHorario: {
        dias: Array<number>,
        hora: number,
        minutos: number
    }): Promise<Horario> {
        const { dias, hora, minutos } = dadosHorario;

        if(!dias || !hora || !minutos) {
            throw new TypeError('Erro: Parâmetro(s) nulo(s)');
        }

        return await this.gateway.gerarHorario(
            new Horario(dias, hora, minutos)
        );
    }
}