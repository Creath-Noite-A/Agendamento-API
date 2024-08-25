import IGatewayUsuario from "./interfaces/IGatewayUsuario";
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

    async pesquisarUsuarioIdPorTelefone(telefone: number): Promise<string> {
        const { data, error } = await supabase
            .from('usuarios')
            .select()
            .is('telefone', telefone);
        
        if(error) {
            throw new Error(`Erro ao pesquisar id de usuário por telefone: ${error.message}`);
        }

        if(data.length > 1) {
            throw new Error(`Problema ao pesquisar usuário: id duplicado no banco de dados`);
        }

        return data[0].id;
    }
}
