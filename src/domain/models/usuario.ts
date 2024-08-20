export default class Usuario {
    id: string;
    telefone: number;
    nome: string;
    senha: string

    constructor(id: string, telefone: number, nome: string, senha: string) {
        this.id = id;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
    }
}