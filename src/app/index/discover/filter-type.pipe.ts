import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterType'
})
export class FilterTypePipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    if(args[0] == "all"){
      return value;
    }else{
      return value.filter((item)=>{
        return item.type == args[0];
      })
    }
  }

}
