import Usuario from "../../../domain/models/Usuario";

export default interface IGatewayUsuario {
  cadastrarUsuario(usuario: Usuario): Promise<Usuario>;
  listarUsuarios(): Promise<Array<Usuario>>;
  pesquisarUsuarioPorTelefone(telefone: string): Promise<Usuario>;
}
