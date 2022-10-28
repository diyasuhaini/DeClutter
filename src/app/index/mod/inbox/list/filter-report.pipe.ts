import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterReport'
})
export class FilterReportPipe implements PipeTransform {
  private testing = [];

  transform(value: Array<any>, ...args: any): any {
    
    if(args[0] == undefined || args[0] == ""){
      return value;
    // } else if (args[0] == "bug" || args[0] == "payment" || args[0] == "order") {
    //   return value.filter((reports)=>{
    //     return reports.error.toLowerCase().indexOf(args[0].toLowerCase()) >= 0
    //   })
    }else{
      return value.filter((reports)=>{
        return reports.username.toLowerCase().indexOf(args[0].toLowerCase()) >= 0
      })
    }
  }
}
