class Usuario {
    #id: string;
    #telefone: number;
    #nome: string;
    #senha: string

    constructor(id: string, telefone: number, nome: string, senha: string) {
        this.#id = id;
        this.#telefone = telefone;
        this.#nome = nome;
        this.#senha = senha;
    }

    get id(): string {
        return this.#id;
    }

    set id(value: string) {
        this.#id = value;
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