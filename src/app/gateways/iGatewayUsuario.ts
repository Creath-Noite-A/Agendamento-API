import Usuario from '../../domain/models/usuario';

export default interface IGatewayUsuario {
    cadastrarUsuario(usuario: Usuario): Usuario;
    listarUsuarios(): Array<Usuario>;
}