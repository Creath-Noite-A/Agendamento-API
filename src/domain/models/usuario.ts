export default class Usuario {
    #telefone: number;
    #nome: string;
    #senha: string

    constructor(telefone: number, nome: string, senha: string) {
        this.#telefone = telefone;
        this.#nome = nome;
        this.#senha = senha;
    }

    get telefone(): number {
        return this.#telefone;
    }

    set telefone(value: number) {
        this.#telefone = value;
    }

    get nome(): string {
        return this.#nome;
    }

    set nome(value: string) {
        this.#nome = value;
    }

    get senha(): string {
        return this.#senha;
    }

    set senha(value: string) {
        this.#senha = value;
    }
}