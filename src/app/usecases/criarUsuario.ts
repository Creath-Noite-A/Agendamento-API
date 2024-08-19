import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/iGatewayUsuario";

export default class CriarUsuario {
    #repo: IGatewayUsuario;

    constructor(gateway: IGatewayUsuario) {
        this.#repo = gateway;
    }

    public async cadastrar(usuario: Usuario): Promise<Usuario> {
        return await this.#repo.cadastrarUsuario(usuario);
    }
}