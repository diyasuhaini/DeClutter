import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSizes'
})
export class FilterSizesPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any): any {
    // console.log(value);
    // console.log(args);
    if (args[0] == null){
      return value;
    } else {
      var checker = [];
      var i = -1;
      value.forEach((value) => {
        console.log("item",value);
        i++;
        
        args[0].forEach((arg) => { 
          if (value.size == arg){
            checker[i] = true;
            console.log(checker);
          }
        });
      });
      var u = -1
      return value.filter((item)=>{
        u++;
        return checker[u];
      });
    
    }
  }

}
