import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    if (args[0] == false) {
      return value.sort(function(a, b){return a.price - b.price});
    } else {
      return value.sort(function(a, b){return b.price - a.price});
    } 
  }

}
