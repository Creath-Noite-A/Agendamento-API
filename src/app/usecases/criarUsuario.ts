import Usuario from "../../domain/models/usuario";
import IGatewayUsuario from "../gateways/iGatewayUsuario"

export default class CriarUsuario {
    #repositorio: IGatewayUsuario;
    constructor(repositorio: IGatewayUsuario) {
        this.#repositorio = repositorio
    }
    public cadastrar(usuario: Usuario): Usuario {
        return this.#repositorio.cadastrarUsuario(usuario);
    }
}