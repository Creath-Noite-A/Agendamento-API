import Usuario from '../../../domain/models/usuario';

export default interface IGatewayUsuario {
    cadastrarUsuario(usuario: Usuario): Promise<Usuario>;
    listarUsuarios(): Promise<Array<Usuario>>;
    pesquisarUsuarioIdPorTelefone(telefone: number): Promise<string>;
}