import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'searchTovar'
})

export class SearchTovarPipe implements PipeTransform {

  transform(tovars, value) {
    console.log("Search")
    
    if (typeof value === 'string' && value.length > 0) {
      if (value.length > 0) {
        const upperValue = value.toUpperCase()
        tovars = tovars.filter(tovar =>(tovar.prodName.toUpperCase().includes(upperValue) || tovar.prodCode.toUpperCase().includes(upperValue)))
      }
    }

    return tovars;
  }

}
