import Agendamento from "../../domain/models/Agendamento";
import Usuario from "../../domain/models/Usuario";
import { supabase } from "../../infra/client.Supabase";
import IGatewayAgendamento from "./interfaces/IGatewayAgendamento";

export default class GatewayAgendamento implements IGatewayAgendamento {
  async criarAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const { id, usuarioId, dataMarcada } = agendamento;

    const dataRegistro =
      dataMarcada?.toLocaleDateString() +
      " " +
      dataMarcada?.toLocaleTimeString();

    console.log(dataRegistro);

    if (dataRegistro == null) {
      throw new TypeError(
        "Não foi possível converter Date para Timezone na conexão com o banco de dados"
      );
    }

    const { data, error } = await supabase
      .from("agendamentos")
      .insert([{ id, usuarioId, dataMarcada: dataRegistro }]);

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
      .eq("usuarioId", usuario.id);

    if (error) {
      throw new Error(`Erro ao buscar agendamentos ${error.message}`);
    }

    return data;
  }

  async verificarDataMarcada(dataMarcada: Date): Promise<boolean> {
    const dataRegistro =
      dataMarcada?.toLocaleDateString() +
      " " +
      dataMarcada?.toLocaleTimeString();

    console.log(dataRegistro);

    if (dataRegistro == null) {
      throw new TypeError(
        "Não foi possível converter Date para Timezone na conexão com o banco de dados"
      );
    }

    const { data, error } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("dataMarcada", dataRegistro);

    if (error) {
      throw new Error(`Erro ao buscar agendamentos ${error.message}`);
    }

    return data.length === 0;
  }
}
