import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReport'
})
export class FilterReportPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    
    if(args[0] == undefined || args[0] == ""){
      return value;
    } else {
      return value.filter((reports)=>{
        return reports.error.toLowerCase().indexOf(args[0].toLowerCase()) >= 0
      })
    }
  }
}
