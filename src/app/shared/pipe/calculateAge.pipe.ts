import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'calculateAge'
})
export class CalculateAgePipe implements PipeTransform {

  transform(value: any): any {
    let today = moment();
    let birthDate = moment(value);
    let years = today.diff(birthDate, 'years');
    let html: string = years + " yr ";

    html += today.subtract(years, 'years').diff(birthDate, 'months') + " mo";
    console.log("html", html);
    
    return html;
  }

}
