import Horario from "../../../domain/models/Horario";
import IGatewayHorario from "../interfaces/IGatewayHorario";

const horarios = [
    new Horario('horarioId', 0, new Date())
];

export default class GatewayHorario implements IGatewayHorario {
    async gerarHorario(horario: Horario): Promise<Horario> {
        return horario;
    }

    async listarHorarios(): Promise<Array<Horario>> {
        const data = horarios;

        return data.map((item: any) => new Horario(
            item.dia,
            item.hora,
            item.minutos
        ));
    }
}