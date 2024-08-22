export default class Horario {
    dias: Array<number>;
    hora: number;
    minutos: number;
    
    constructor(
        dias: Array<number>,
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

        this.dias = dias;
        this.hora = hora;
        this.minutos = minutos;
    }
}