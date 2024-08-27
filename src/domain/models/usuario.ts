export default class Usuario {
    id: string | null;
    telefone: string | null;
    nome: string | null;
    senha: string | null;

    constructor(
        id: string | null,
        telefone: string | null,
        nome: string | null,
        senha: string | null
    ) {
        this.id = id;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
    }

    pronto(): Boolean {
        if(!this.id || !this.telefone || !this.nome || !this.senha) {
            return false;
        }
        return true;
    }
}