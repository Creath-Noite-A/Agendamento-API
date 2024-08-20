import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/IGatewayUsuario";

export default class CriarUsuario {
    private gatewayUsuario: IGatewayUsuario;

    constructor(gatewayUsuario: IGatewayUsuario) {
        this.gatewayUsuario = gatewayUsuario;
    }

    async execute(dadosUsuario: { id: string, telefone: number, nome: string, senha: string }): Promise<Usuario> {
        const { id, telefone, nome, senha } = dadosUsuario;

        if (!id || !telefone || !nome || !senha) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        const novoUsuario = new Usuario(id, telefone, nome, senha);
        const usuarioCriado = await this.gatewayUsuario.cadastrarUsuario(novoUsuario);

        return usuarioCriado;
    }
}