import { v4 } from 'uuid';

import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";

export default class CadastrarUsuario {
    private gateway: IGatewayUsuario;

    constructor(gateway: IGatewayUsuario) {
        this.gateway = gateway;
    }

    async execute(dadosUsuario: {
        telefone: number,
        nome: string,
        senha: string
    }): Promise<Usuario> {
        const { telefone, nome, senha } = dadosUsuario;

        if ( !telefone || !nome || !senha) {
            throw new Error('Todos os campos são obrigatórios.');
        }

        const id = v4();

        return await this.gateway.cadastrarUsuario(
            new Usuario(id, telefone, nome, senha)
        );
    }
}