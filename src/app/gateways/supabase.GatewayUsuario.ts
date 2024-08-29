import IGatewayUsuario from "./interfaces/IGatewayUsuario";
import Usuario from "../../domain/models/Usuario";
import { supabase } from "../../infra/client.Supabase";

export default class GatewayUsuario implements IGatewayUsuario {
  async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
    const { id, telefone, nome, senha } = usuario;

    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ id, telefone, nome, senha }]);

    if (error) {
      throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
    }

    return usuario;
  }

  async listarUsuarios(): Promise<Array<Usuario>> {
    const { data, error } = await supabase.from("usuarios").select("*");

    if (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }

    return data.map(
      (item: any) => new Usuario(item.id, item.telefone, item.nome, item.senha)
    );
  }

  async pesquisarUsuarioPorTelefone(telefone: string): Promise<Usuario> {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("telefone", telefone);

    if (error) {
      throw new Error(
        `Erro ao pesquisar usuário por telefone: ${error.message}`
      );
    }

    if (data.length > 1) {
      throw new Error(
        `Problema ao pesquisar usuário: id duplicado no banco de dados`
      );
    }

    const usuario = data[0];

    return new Usuario(
      usuario.id,
      usuario.telefone,
      usuario.nome,
      usuario.senha
    );
  }
}
