export default class Usuario {
    readonly id: string;
    readonly telefone: number;
    readonly nome: string;
    readonly senha: string

    public constructor(id: string, telefone: number, nome: string, senha: string) {
        this.id = id;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
    }
}