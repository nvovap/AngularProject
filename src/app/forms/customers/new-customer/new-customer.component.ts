import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


import { CustomerService } from 'app/services/data/customer.service';
import { TemplatesService } from 'app/services/data/templates.service';





@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
  providers: [CustomerService]
})

export class NewCustomerComponent  implements OnInit  {

  @Input() customer;
  @Output() addNewCustomerFlagChange =  new EventEmitter<Boolean>();

  
  @Input() itIsAddCustomer = false;



  public NIPMask = [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/ ];
  public kodPocztowyMask = [ /\d/, /\d/, '-', /\d/, /\d/, /\d/];


  selectPageAdres = 1;
  selectPageKontakt = 1;
  kindPrefiksUE = [];

  buttonGetCustomerNIPEnable = true; 

  constructor(private customerSer: CustomerService, private tempService: TemplatesService ) { 
    this.kindPrefiksUE = tempService.getKindPrefiksUE()
    console.log(this.customer)

  }

  ngOnInit() {
    console.log(this.customer)
  }




  onGetCustomerNIP() {
    this.buttonGetCustomerNIPEnable = false;


    this.customerSer.getCustomerNIB(this.customer.NIP ).subscribe(
    (data) => {
      console.log(data);
      this.customer = data;
      this.buttonGetCustomerNIPEnable = true;
      this.itIsAddCustomer = false;
    },
    (err) => {
      this.buttonGetCustomerNIPEnable = true;
    })
  }

  onSaveCustomer() {
    this.customerSer.saveCustomer(this.customer);
    this.addNewCustomerFlagChange.emit(false);
  }


  onCancelCustomer() {
    this.addNewCustomerFlagChange.emit(false);
  }

}
