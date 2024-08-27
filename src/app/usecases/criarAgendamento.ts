import { v4 } from "uuid";

import Agendamento from "../../domain/models/Agendamento";
import IGatewayAgendamento from "../gateways/interfaces/IGatewayAgendamento";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";

export default class CriarAgendamento {
    private gatewayUsuario: IGatewayUsuario;
    private gatewayAgendamento: IGatewayAgendamento;

    constructor(
        gatewayUsuario: IGatewayUsuario,
        gatewayAgendamento: IGatewayAgendamento
    ) {
        this.gatewayUsuario = gatewayUsuario;
        this.gatewayAgendamento = gatewayAgendamento;
    }
    
    async execute(dadosUsuario: {
        telefone: string
    }, dadosAgendamento: {
        dataMarcada: Date
    }): Promise<Agendamento> {
        const { dataMarcada } = dadosAgendamento;
        const { telefone } = dadosUsuario;

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