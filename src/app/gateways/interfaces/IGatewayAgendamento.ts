import Agendamento from "../../../domain/models/Agendamento";

export default interface IGatewayAgendamento {
    criarAgendamento(agendamento: Agendamento): Promise<Agendamento>;
    listarAgendamentosComFiltro(agendamento: Agendamento): Promise<Array<Agendamento>>;
}