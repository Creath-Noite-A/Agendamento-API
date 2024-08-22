import IGatewayUsuario from "./IGatewayUsuario";
import Usuario from "../../domain/models/usuario";
import { supabase } from "../../infra/supabaseClient";

export default class GatewayUsuario implements IGatewayUsuario {
    async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
        const { id, telefone, nome, senha} = usuario;
        
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ id, telefone, nome, senha }]);

        if (error) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        }

        return usuario;
    }

    async listarUsuarios(): Promise<Array<Usuario>> {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) {
            throw new Error(`Erro ao listar usuários: ${error.message}`);
        }

        return data.map((item: any) => new Usuario(
            item.id,
            item.telefone,
            item.nome,
            item.senha
        ));
    }
}
