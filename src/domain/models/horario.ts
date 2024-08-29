export default class Horario {
  id: string | null;
  dia: number | null;
  hora: number | null;
  minutos: number | null;

  constructor(
    id: string | null,
    dia: number | null,
    hora: number | null,
    minutos: number | null
  ) {
    this.id = id;
    this.dia = dia;
    this.hora = hora;
    this.minutos = minutos;
  }
}
