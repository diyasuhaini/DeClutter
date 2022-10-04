import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategories'
})
export class FilterCategoriesPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    if(args[0] == "unisex" || args[0] == null){
      return value;
    } else  {
      return value.filter((item)=>{
        return item.categories == args[0];
      })
    }
  }

}
