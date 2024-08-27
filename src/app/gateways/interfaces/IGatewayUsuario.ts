import Usuario from '../../../domain/models/Usuario';

export default interface IGatewayUsuario {
    cadastrarUsuario(usuario: Usuario): Promise<Usuario>;
    loginUsuario(usuario: Usuario): Promise<Usuario>;
    listarUsuarios(): Promise<Array<Usuario>>;
    pesquisarUsuarioIdPorTelefone(telefone: string): Promise<string>;
}