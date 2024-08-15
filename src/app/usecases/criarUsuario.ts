import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/iGatewayUsuario";

export default class CriarUsuario {
    #repo: IGatewayUsuario;

    constructor(gateway: IGatewayUsuario) {
        this.#repo = gateway;
    }

    public cadastrar(usuario: Usuario): Usuario {
        return this.#repo.cadastrarUsuario(usuario);
    }
}