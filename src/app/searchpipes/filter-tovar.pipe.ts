import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTovar'
})
export class FilterTovarPipe implements PipeTransform {

  transform(tovars, tovarsForFilter, value) {
    console.log("Search")

    tovars = [];
    
    if (typeof value === 'string') {

      const upperValue = value.toUpperCase()

      console.log("(=============  tovarsForFilter  ==============)")


      if (value.length>0) {
        tovars = tovarsForFilter.filter(tovar =>(tovar.prodName.toUpperCase().includes(upperValue) || tovar.prodCode.toUpperCase().includes(upperValue)))
      }

    } 


    return tovars;
  }

}
