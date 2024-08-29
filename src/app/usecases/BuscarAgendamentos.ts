import Agendamento from "../../domain/models/Agendamento";
import IGatewayAgendamento from "../gateways/interfaces/IGatewayAgendamento";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";

export default class BuscarAgendamento {
  private gatewayAgendamento: IGatewayAgendamento;
  private gatewayUsuario: IGatewayUsuario;

  constructor(
    gatewayAgendamento: IGatewayAgendamento,
    gatewayUsuario: IGatewayUsuario
  ) {
    this.gatewayAgendamento = gatewayAgendamento;
    this.gatewayUsuario = gatewayUsuario;
  }

  async execute(dadosUsuario: {
    telefone: string;
  }): Promise<Array<Agendamento>> {
    const { telefone } = dadosUsuario;

    if (!telefone) {
      throw new Error("Erro: Parâmetro nulo");
    }

    const usuario = await this.gatewayUsuario.pesquisarUsuarioPorTelefone(
      telefone
    );

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return await this.gatewayAgendamento.buscarAgendamentosPorUsuario(usuario);
  }
}
