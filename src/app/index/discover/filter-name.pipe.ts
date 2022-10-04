import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    if(args[0] == undefined || args[0] == ""){
      return value;
    } else {
      return value.filter((item)=>{
        return item.title.toLowerCase().indexOf(args[0].toLowerCase()) >= 0
      })
    }
  }

}
