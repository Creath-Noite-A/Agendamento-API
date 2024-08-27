import Agendamento from '../../domain/models/Agendamento';
import { supabase } from '../../infra/client.Supabase';
import IGatewayAgendamento from './interfaces/IGatewayAgendamento';

export default class GatewayAgendamento implements IGatewayAgendamento {
    async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
        const { id, usuarioId, dataMarcada } = agendamento;

        const { data, error } = await supabase
            .from('agendamentos')
            .insert([{ id, usuarioId, dataMarcada }]);

        if(error) {
            throw new Error(`Erro ao marcar agendamento: ${error.message}`);
        }

        return agendamento;
    }

    async listarAgendamentosComFiltro(agendamento: Agendamento): Promise<Array<Agendamento>> {
        

        return new Array<Agendamento>();
    }
}