import { v4 } from "uuid";

import Agendamento from "../../domain/models/agendamento";
import Usuario from "../../domain/models/usuario";
import IGatewayAgendamento from "../gateways/interfaces/IGatewayAgendamento";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";

export default class MarcarAgendamento {
    private gatewayUsuario: IGatewayUsuario;
    private gatewayAgendamento: IGatewayAgendamento;

    constructor(
        gatewayUsuario: IGatewayUsuario,
        gatewayAgendamento: IGatewayAgendamento
    ) {
        this.gatewayUsuario = gatewayUsuario;
        this.gatewayAgendamento = gatewayAgendamento;
    }
    
    async execute(usuario: Usuario, dadosAgendamento: {
        dataMarcada: Date
    }): Promise<Agendamento> {
        const { dataMarcada } = dadosAgendamento;
        const { telefone } = usuario;

        if(!telefone || !dataMarcada) {
            throw new TypeError('Erro: Parâmetro(s) nulo(s)');
        }

        const usuarioId = await this.gatewayUsuario.pesquisarUsuarioIdPorTelefone(telefone);

        if(!usuarioId) {
            throw new Error('Erro: não foi possível criar agendamento com tal usuário');
        }

        const id = v4();

        return await this.gatewayAgendamento.criarAgendamento(
            new Agendamento(id, usuarioId, dataMarcada)
        );
    }
}