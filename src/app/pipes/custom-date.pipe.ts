import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(date: Date): string {
    //Array de dias
    let dias: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    //Array de meses
    let meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    //Devolvemos la fecha con el formato correcto
    return `${dias[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]} del ${date.getFullYear()}`
  }

}
