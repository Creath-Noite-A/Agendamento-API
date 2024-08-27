import Horario from "../../../domain/models/Horario";

export default interface IGatewayHorario {
    gerarHorario(horario: Horario): Promise<Horario>;
    listarHorarios(): Promise<Array<Horario>>;
}