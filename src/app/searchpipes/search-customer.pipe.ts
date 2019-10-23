import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCustomer'
})
export class SearchCustomerPipe implements PipeTransform {

  transform(customers, value) {
    console.log("Search")
    
    if (typeof value === 'string') {
      if (value.length > 0) {
        const upperValue = value.toUpperCase()
        customers = customers.filter(customer =>(customer.name.toUpperCase().includes(upperValue) || customer.NIP.toUpperCase().includes(upperValue)))
      }
    }

    return customers;
  }

}
