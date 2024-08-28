import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/iGatewayUsuario";

export default class CriarUsuario {
    private gatewayUsuario: IGatewayUsuario;

    constructor(gatewayUsuario: IGatewayUsuario) {
        this.gatewayUsuario = gatewayUsuario;
    }

    async execute(dadosUsuario: {telefone: number, nome: string, senha: string }): Promise<Usuario> {
        const {telefone, nome, senha} = dadosUsuario;

        if (!telefone || !nome || !senha) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        const novoUsuario = new Usuario(telefone, nome, senha);
        const usuarioCriado = await this.gatewayUsuario.cadastrarUsuario(novoUsuario);

        return usuarioCriado;
    }
}