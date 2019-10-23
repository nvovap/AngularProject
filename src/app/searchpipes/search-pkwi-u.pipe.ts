import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPKWiU'
})
export class SearchPKWiUPipe implements PipeTransform {

  transform(PKWiUs, value) {
    console.log("Search")
    
    if (typeof value === 'string' && value.length > 0) {
      if (value.length > 0) {
        const upperValue = value.toUpperCase()
        PKWiUs = PKWiUs.filter(PKWiU =>(PKWiU.code.includes(upperValue)))
      }
    }

    return PKWiUs;
    
  }

}
