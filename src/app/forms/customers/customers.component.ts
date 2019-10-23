import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from 'app/services/data/customer.service';
import { Customer } from './customer';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {


  customers = [];

  addNewCustomerFlag = false;

  @Input() flagSelectCustomer = false;

  @Output() selectCustomer = new EventEmitter<{ Customer }>();

  currentCustomer = new Customer();
  itIsAddCustomer = false;




  constructor(private customerSer: CustomerService) { }

  ngOnInit() {
    this.customerSer.getCustomers().subscribe(
      querySnapshot => {

        console.log('getCustomers')

        this.customers = [];

        querySnapshot.forEach(dataElement => {

          var dataNewElement = Object.assign(new Customer(), dataElement);


          this.customers.push(dataNewElement);
        })
      })
  }


  getOldCustomers() {
    this.customerSer.getOldCustomer()
  }

  onAddCustomer() {

    this.currentCustomer = new Customer()


    this.itIsAddCustomer = true;
    this.addNewCustomerFlag = true;

  }


  onChangedAddNewCustomerFlag(increased: any) {
    this.addNewCustomerFlag = false;
  }



  onEditCustomer(data) {


    this.currentCustomer = data;
    this.addNewCustomerFlag = true;
    this.itIsAddCustomer = false;



    document.scrollingElement.scrollTop = 30


  }


  onSelectCustomer(data) {
    console.log("onSelectCustomer");
    this.selectCustomer.emit(data);
  }


}