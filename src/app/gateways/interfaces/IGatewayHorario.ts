import Horario from "../../../domain/models/Horario";

export default interface IGatewayHorario {
  gerarHorario(horario: Horario): Promise<Horario>;
  verificarHorario(horario: Horario): Promise<boolean>;
  listarHorarios(): Promise<Array<Horario>>;
}
