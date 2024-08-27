export default class Agendamento {
    id: string | null;
    usuarioId: string | null;
    dataMarcada: Date | null;

    constructor(id: string | null, usuarioId: string | null, dataMarcada: Date | null) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.dataMarcada = dataMarcada;
    }
}