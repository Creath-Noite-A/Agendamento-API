import Horario from "../../domain/models/Horario";
import IGatewayHorario from "../gateways/interfaces/IGatewayHorario";
import GatewayHorario from "../gateways/supabase.GatewayHorario";

export default class ListarHorarios {
  private gateway: IGatewayHorario;

  constructor(gateway: GatewayHorario) {
    this.gateway = gateway;
  }

  async execute(): Promise<Array<Horario>> {
    return await this.gateway.listarHorarios();
  }
}
