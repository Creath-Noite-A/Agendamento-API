import { v4 } from "uuid";

import Horario from "../../domain/models/Horario";
import IGatewayHorario from "../gateways/interfaces/IGatewayHorario";

export default class CriarHorario {
  private gateway: IGatewayHorario;

  constructor(gateway: IGatewayHorario) {
    this.gateway = gateway;
  }

  async execute(dadosHorario: {
    dia: number;
    hora: number;
    minutos: number;
  }): Promise<Horario> {
    const { dia, hora, minutos } = dadosHorario;

    if (!dia || !hora || !minutos) {
      throw new TypeError("Erro: Parâmetro(s) nulo(s)");
    }

    const id = v4();

    return await this.gateway.gerarHorario(new Horario(id, dia, hora, minutos));
  }
}
