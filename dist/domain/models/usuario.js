"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Usuario_id, _Usuario_telefone, _Usuario_nome, _Usuario_senha;
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(id, telefone, nome, senha) {
        _Usuario_id.set(this, void 0);
        _Usuario_telefone.set(this, void 0);
        _Usuario_nome.set(this, void 0);
        _Usuario_senha.set(this, void 0);
        __classPrivateFieldSet(this, _Usuario_id, id, "f");
        __classPrivateFieldSet(this, _Usuario_telefone, telefone, "f");
        __classPrivateFieldSet(this, _Usuario_nome, nome, "f");
        __classPrivateFieldSet(this, _Usuario_senha, senha, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Usuario_id, "f");
    }
    set id(value) {
        __classPrivateFieldSet(this, _Usuario_id, value, "f");
    }
    get telefone() {
        return __classPrivateFieldGet(this, _Usuario_telefone, "f");
    }
    set telefone(value) {
        __classPrivateFieldSet(this, _Usuario_telefone, value, "f");
    }
    get nome() {
        return __classPrivateFieldGet(this, _Usuario_nome, "f");
    }
    set nome(value) {
        __classPrivateFieldSet(this, _Usuario_nome, value, "f");
    }
    get senha() {
        return __classPrivateFieldGet(this, _Usuario_senha, "f");
    }
    set senha(value) {
        __classPrivateFieldSet(this, _Usuario_senha, value, "f");
    }
}
_Usuario_id = new WeakMap(), _Usuario_telefone = new WeakMap(), _Usuario_nome = new WeakMap(), _Usuario_senha = new WeakMap();
exports.default = Usuario;
