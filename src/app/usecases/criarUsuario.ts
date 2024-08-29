import { v4 } from "uuid";
import bcrypt from "bcrypt";

import Usuario from "../../domain/models/Usuario";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";

export default class CriarUsuario {
  private gateway: IGatewayUsuario;

  constructor(gateway: IGatewayUsuario) {
    this.gateway = gateway;
  }

  async execute(dadosUsuario: {
    telefone: string;
    nome: string;
    senha: string;
  }): Promise<Usuario> {
    const { telefone, nome, senha } = dadosUsuario;

    if (telefone == null || nome == null || senha == null) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    if (telefone.length != 11) {
      throw new Error("Número de telefone inválido");
    }

    if (isNaN(Number(telefone)) || !Number.isInteger(Number(telefone))) {
      throw new Error("Número de telefone deve conter somente dígitos");
    }

    const _nome = nome.trim();

    if (_nome.length < 2) {
      throw new Error("Nome muito curto");
    }

    if (_nome.length > 16) {
      throw new Error("Reduza um pouco do nome");
    }

    if (!/^[A-Za-záàâãéèêíïóôõöúüçñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÇÑ ]+$/.test(_nome)) {
      throw new Error("Nome deve conter somente caracteres padrão");
    }

    if (senha.length < 8) {
      throw new Error("A senha deve conter no mínimo 8 caracteres");
    }

    if (senha.length > 16) {
      throw new Error("A senha deve conter no máximo 16 caracteres");
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{8,16}$/.test(senha)
    ) {
      throw new Error(
        "A senha deve conter ao menos 1 letra maiúscula, " +
          "1 letra minúscula e 1 dígito (permitidos alguns caracteres especiais)"
      );
    }

    const id = v4();

    const senhaHash = await bcrypt.hash(senha, 10);

    return await this.gateway.cadastrarUsuario(
      new Usuario(id, telefone, nome, senhaHash)
    );
  }
}
