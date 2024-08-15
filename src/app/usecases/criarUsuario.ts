import Usuario from "../../domain/models/usuario";
import IRepositorioUsuario from "../gateways/iRepositorioUsuario"

export default class CriarUsuario {
    #repositorio: IRepositorioUsuario;
    constructor(repositorio: IRepositorioUsuario) {
        this.#repositorio = repositorio
    }
    public cadastrar(usuario: Usuario): Usuario {
        return this.#repositorio.cadastrarUsuario(usuario);
    }
}