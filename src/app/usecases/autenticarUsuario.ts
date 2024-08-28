import IGatewayUsuario from "../gateways/iGatewayUsuario";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class autenticarUsuario {
    private gatewayUsuario: IGatewayUsuario;

    constructor(gatewayUsuario: IGatewayUsuario) {
        this.gatewayUsuario = gatewayUsuario;
    }

    async execute(dadosLogin: {telefone: number, senha: string}): Promise<string> {
        const { telefone, senha } = dadosLogin;

        if (!telefone || !senha) {
            throw new Error('Telefone e senha são obrigatórios.');
        }

        const usuarios = await this.gatewayUsuario.listarUsuarios();
        const usuario = usuarios.find(u => u.telefone === telefone);

        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            throw new Error('Senha incorreta.');
        }

        const token = jwt.sign({ telefone: usuario.telefone }, 'seu_segredo_jwt', { expiresIn: '1h' });
        return token;
    }
}