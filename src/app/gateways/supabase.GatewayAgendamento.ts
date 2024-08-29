import Agendamento from "../../domain/models/Agendamento";
import Usuario from "../../domain/models/Usuario";
import { supabase } from "../../infra/client.Supabase";
import IGatewayAgendamento from "./interfaces/IGatewayAgendamento";

export default class GatewayAgendamento implements IGatewayAgendamento {
  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const { id, usuarioId, dataMarcada } = agendamento;

    const { data, error } = await supabase
      .from("agendamentos")
      .insert([{ id, usuarioId, dataMarcada }]);

    if (error) {
      throw new Error(`Erro ao marcar agendamento: ${error.message}`);
    }

    return agendamento;
  }

  async buscarAgendamentosPorUsuario(
    usuario: Usuario
  ): Promise<Array<Agendamento>> {
    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .eq("usuarioId", usuario);

    if (error) {
      throw new Error(`Erro ao buscar agendamentos ${error.message}`);
    }

    return data.map(
      (item: any) => new Agendamento(item.id, usuario.id, item.dataMarcada)
    );
  }

  async verificarDataMarcada(dataMarcada: Date): Promise<boolean> {
    const { data, error } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("dataMarcada", dataMarcada);

    if (error) {
      throw new Error(`Erro ao buscar agendamentos ${error.message}`);
    }

    return data.length === 0;
  }
}
