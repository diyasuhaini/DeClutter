import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qtyFilter'
})
export class QtyFilterPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    return value.filter((item)=>{
      return item.quantity == 0;
    })
  }

}
