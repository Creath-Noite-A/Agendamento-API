import Agendamento from '../../../domain/models/Agendamento';
import IGatewayAgendamento from '../interfaces/IGatewayAgendamento';

const agendamentos = [
    new Agendamento('agendamentoId', 'usuarioId', new Date())
];

export default class GatewayAgendamento implements IGatewayAgendamento {
    async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
        return agendamento;
    }

    async listarAgendamentosComFiltro(filtro: Agendamento): Promise<Array<Agendamento>> {    
        const data = new Array<Agendamento>;

        agendamentos.forEach(a => {
            if(
                a.id === filtro.id || !filtro.id
                && a.usuarioId === filtro.usuarioId || !filtro.usuarioId
                && (a.dataMarcada === filtro.dataMarcada || !filtro.dataMarcada)
            ) {
                data.push(a);
            }
        });

        return data;
    }
}