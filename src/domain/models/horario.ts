export default class Horario {
    id: string | null;
    dia: number | null;
    hora: Date | null;
    
    constructor(id: string | null, dia: number | null, hora: Date | null) {
        this.id = id;
        this.dia = dia;
        this.hora = hora;
    }
}