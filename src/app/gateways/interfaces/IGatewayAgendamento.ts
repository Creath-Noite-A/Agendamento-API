import Usuario from "../../../domain/models/Usuario";
import Agendamento from "../../../domain/models/Agendamento";

export default interface IGatewayAgendamento {
  criarAgendamento(agendamento: Agendamento): Promise<Agendamento>;
  buscarAgendamentosPorUsuario(usuario: Usuario): Promise<Array<Agendamento>>;
  verificarDataMarcada(dataMarcada: Date): Promise<boolean>;
}
