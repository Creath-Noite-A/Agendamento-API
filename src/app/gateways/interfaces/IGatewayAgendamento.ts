import Agendamento from "../../../domain/models/agendamento";

export default interface IGatewayAgendamento {
    criarAgendamento(agendamento: Agendamento): Promise<Agendamento>;
    listarAgendamentosComFiltro(agendamento: Agendamento): Promise<Array<Agendamento>>;
}