import { v4 } from "uuid";

import Agendamento from "../../domain/models/Agendamento";
import Horario from "../../domain/models/Horario";
import IGatewayAgendamento from "../gateways/interfaces/IGatewayAgendamento";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";
import IGatewayHorario from "../gateways/interfaces/IGatewayHorario";

export default class CriarAgendamento {
  private gatewayUsuario: IGatewayUsuario;
  private gatewayHorario: IGatewayHorario;
  private gatewayAgendamento: IGatewayAgendamento;

  constructor(
    gatewayUsuario: IGatewayUsuario,
    gatewayHorario: IGatewayHorario,
    gatewayAgendamento: IGatewayAgendamento
  ) {
    this.gatewayUsuario = gatewayUsuario;
    this.gatewayHorario = gatewayHorario;
    this.gatewayAgendamento = gatewayAgendamento;
  }

  async execute(dados: {
    telefone: string;
    dataMarcada: string;
  }): Promise<Agendamento> {
    const { dataMarcada, telefone } = dados;

    console.log(dataMarcada, telefone);
    if (!telefone || !dataMarcada) {
      throw new TypeError("Erro: Parâmetro(s) nulo(s)");
    }

    const usuario = await this.gatewayUsuario.pesquisarUsuarioPorTelefone(
      telefone
    );

    if (!usuario.id) {
      throw new Error(
        "Erro: não foi possível criar agendamento com tal usuário"
      );
    }

    const dataParse = new Date(dataMarcada);

    if (
      dataParse.getTime() < Date.now() ||
      (dataParse.getTime() - Date.now()) / (1000 * 60 * 60 * 24) >= 14
    ) {
      throw new Error("Data indisponível");
    }

    if (!(await this.gatewayAgendamento.verificarDataMarcada(dataParse))) {
      throw new Error("Data já marcada por outro cliente");
    }

    if (
      !(await this.gatewayHorario.verificarHorario(
        new Horario(
          null,
          dataParse.getDay(),
          dataParse.getHours(),
          dataParse.getMinutes()
        )
      ))
    ) {
      throw new Error("Data indisponível");
    }

    const queryAgendamentos =
      await this.gatewayAgendamento.buscarAgendamentosPorUsuario(usuario);

    if (queryAgendamentos != null) {
      let i = 0;
      queryAgendamentos.forEach((a) => {
        if (!a.dataMarcada) return;
        if (a.dataMarcada?.getTime() >= Date.now()) i++;
        if (i > 2)
          throw new Error("Atingiu limite de 2 agendamentos por usuário");
      });
    }

    const id = v4();

    return await this.gatewayAgendamento.criarAgendamento(
      new Agendamento(id, usuario.id, dataParse)
    );
  }
}
