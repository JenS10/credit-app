import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusApplication'
})
export class StatusApplicationPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return value ? 'Aprobado' : 'Rechazado';
  }

}
