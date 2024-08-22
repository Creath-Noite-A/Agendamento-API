export default class Agendamento {
    id: string;
    usuarioId: string;
    dataMarcada: Date;

    constructor(id: string, usuarioId: string, dataMarcada: Date) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.dataMarcada = dataMarcada;
    }
}