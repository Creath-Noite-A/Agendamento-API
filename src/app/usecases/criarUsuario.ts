import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/IGatewayUsuario";

export default class CriarUsuario {
    private gateway: IGatewayUsuario;

    constructor(gateway: IGatewayUsuario) {
        this.gateway = gateway;
    }

    async execute(dadosUsuario: {
        id: string,
        telefone: number,
        nome: string,
        senha: string
    }): Promise<Usuario> {
        const { id, telefone, nome, senha } = dadosUsuario;

        if (!id || !telefone || !nome || !senha) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        return await this.gateway.cadastrarUsuario(
            new Usuario(id, telefone, nome, senha)
        );
    }
}