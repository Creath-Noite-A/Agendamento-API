import Horario from "../../../domain/models/horario";

export default interface IGatewayHorario {
    gerarHorario(horario: Horario): Promise<Horario>;
    listarHorarios(): Promise<Array<Horario>>;
}