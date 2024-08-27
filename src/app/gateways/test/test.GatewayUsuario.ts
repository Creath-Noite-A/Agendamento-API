import Usuario from "../../../domain/models/Usuario";
import IGatewayUsuario from "../interfaces/IGatewayUsuario";

const usuarios = [
    new Usuario('usuarioId', '12345678901', 'Usuario', 'senha123')
];

export default class GatewayUsuario implements IGatewayUsuario {
    async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
        usuarios.push(usuario);

        return usuario;
    }

    async loginUsuario(usuario: Usuario): Promise<Usuario> {
        const { telefone, senha } = usuario;
        usuario = new Usuario(null, telefone, null, senha);

        usuarios.some((u) => {
            if(u.telefone === usuario.telefone) {
                usuario.nome = u.nome;
                usuario.id = u.id;
                return true;
            }
        });

        if(!usuario.pronto()) {
            throw new Error('Erro: usuário não encontrado');
        }

        return usuario;
    }

    async listarUsuarios(): Promise<Array<Usuario>> {
        const data = usuarios;

        return data.map((item: any) => new Usuario(
            item.id,
            item.telefone,
            item.nome,
            item.senha
        ));
    }

    async pesquisarUsuarioIdPorTelefone(telefone: string): Promise<string> {
        const usuario = usuarios.find((usuario) => usuario.telefone === telefone);

        if(!usuario) {
            throw new Error('Erro: usuário não encontrado');
        }

        if(!usuario.id) {
            throw new Error('Erro: id de usuário é nulo');
        }

        return usuario.id;
    }
}
