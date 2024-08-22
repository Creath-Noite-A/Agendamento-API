import Horario from "../../domain/models/horario";
import IGatewayHorario from "./IGatewayHorario";
import { supabase } from "../../infra/supabaseClient";

export default class GatewayHorario implements IGatewayHorario {
    async gerarHorario(horario: Horario): Promise<Horario> {
        const { dias, hora, minutos } = horario;
        
        const { data, error } = await supabase
            .from('horarios')
            .insert([{ dias, hora, minutos }]);

        if (error) {
            throw new Error(`Erro ao cadastrar horário: ${error.message}`);
        }

        return horario;
    }

    async listarHorarios(): Promise<Array<Horario>> {
        const { data, error } = await supabase
            .from('horarios')
            .select('*');

        if (error) {
            throw new Error(`Erro ao listar horários: ${error.message}`);
        }

        return data.map((item: any) => new Horario(
            item.dias,
            item.hora,
            item.minutos
        ));
    }
}