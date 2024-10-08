"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(id, telefone, nome, senha) {
        this.id = id;
        this.telefone = telefone;
        this.nome = nome;
        this.senha = senha;
    }
    pronto() {
        if (!this.id || !this.telefone || !this.nome || !this.senha) {
            return false;
        }
        return true;
    }
}
exports.default = Usuario;
