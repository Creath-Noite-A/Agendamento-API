import Horario from "../../domain/models/Horario";
import IGatewayHorario from "./interfaces/IGatewayHorario";
import { supabase } from "../../infra/client.Supabase";

export default class GatewayHorario implements IGatewayHorario {
  async gerarHorario(horario: Horario): Promise<Horario> {
    const { id, dia, hora } = horario;

    const { data, error } = await supabase
      .from("horarios")
      .insert([{ id, dia, hora }]);

    if (error) {
      throw new Error(`Erro ao cadastrar horário: ${error.message}`);
    }

    return horario;
  }

  async verificarHorario(horario: Horario): Promise<boolean> {
    const { dia, hora, minutos } = await horario;

    const { data, error } = await supabase
      .from("horarios")
      .select("*")
      .eq("dia", dia)
      .eq("hora", hora)
      .eq("minutos", minutos);

    if (error) {
      throw new Error(`Erro ao verificar horário: ${error.message}`);
    }

    if (data.length > 0) {
      return true;
    }
    return false;
  }

  async listarHorarios(): Promise<Array<Horario>> {
    const { data, error } = await supabase.from("horarios").select("*");

    if (error) {
      throw new Error(`Erro ao listar horários: ${error.message}`);
    }

    return data.map(
      (item: any) => new Horario(item.id, item.dia, item.hora, item.minutos)
    );
  }
}
