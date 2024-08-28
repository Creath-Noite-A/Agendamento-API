import IGatewayUsuario from "./iGatewayUsuario";
import Usuario from "../../domain/models/usuario";
import { supabase } from "../../infra/supabaseClient";
import bcrypt from "bcryptjs";

export default class GatewayUsuarioSupabase implements IGatewayUsuario {
    async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
        
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);

        const { data, error } = await supabase
            .from('usuarios')
            .insert([
                { telefone: usuario.telefone, nome: usuario.nome, senha: senhaCriptografada }
            ])
            .single();

        if (error) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        }

        return new Usuario(data['telefone'], data['nome'], data['senha']);
    }

    async listarUsuarios(): Promise<Array<Usuario>> {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) {
            throw new Error(`Erro ao listar usuários: ${error.message}`);
        }

        return data.map((item: any) => new Usuario(item.telefone, item.nome, item.senha));
    }
}