import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusCredit'
})
export class StatusCreditPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? 'Pagado' : 'Pendiente';
  }

}
