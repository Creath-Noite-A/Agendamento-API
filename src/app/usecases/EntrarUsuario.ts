import bcrypt from "bcrypt";

import Usuario from "../../domain/models/Usuario";
import IGatewayUsuario from "../gateways/interfaces/IGatewayUsuario";

export default class EntrarUsuario {
  private gateway: IGatewayUsuario;

  constructor(gateway: IGatewayUsuario) {
    this.gateway = gateway;
  }

  async execute(dadosUsuario: {
    telefone: string;
    senha: string;
  }): Promise<Usuario> {
    const { telefone, senha } = dadosUsuario;

    if (telefone == null || senha == null) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    if (telefone.length != 11) {
      throw new Error("Número de telefone inválido");
    }

    if (isNaN(Number(telefone)) || !Number.isInteger(Number(telefone))) {
      throw new Error("Número de telefone deve conter somente dígitos");
    }

    if (senha.length < 8) {
      throw new Error("Senhas contém no mínimo 8 caracteres");
    }

    if (senha.length > 16) {
      throw new Error("Senhas contém no máximo 16 caracteres");
    }

    const resul = await this.gateway.pesquisarUsuarioPorTelefone(telefone);

    if (!resul) {
      throw new Error("Credenciais inválidas");
    }

    if (!resul.senha) {
      throw new Error("Erro desconhecido");
    }

    if (!(await bcrypt.compare(senha, resul.senha))) {
      throw new Error("Credenciais inválidas");
    }

    return await new Usuario(null, telefone, resul.nome, senha);
  }
}
