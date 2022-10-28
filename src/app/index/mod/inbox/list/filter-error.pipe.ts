import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterError'
})
export class FilterErrorPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    if(args[0] == "all"){
      return value;
    }else{
      return value.filter((reports)=>{
        return reports.error == args[0];
      })
    }
  }

}
