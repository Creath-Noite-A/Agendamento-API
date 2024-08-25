export default class Horario {
    dia: number;
    hora: number;
    minutos: number;
    
    constructor(
        dia: number,
        hora: number, minutos: number
    ) {
        if(
            !Number.isInteger(hora)
            || !Number.isInteger(minutos)
            || hora > 23
            || hora < 0
            || minutos > 59
            || minutos < 0
        ) {
            throw new TypeError('Parâmetros de horário inválidos');
        }

        this.dia = dia;
        this.hora = hora;
        this.minutos = minutos;
    }
}