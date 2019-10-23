import { Component, OnInit } from '@angular/core';
import { TemplatesService } from 'app/services/data/templates.service';
import { Organization } from './organization';
import { OrganizationService } from 'app/services/data/organization.service';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-organization-setting',
  templateUrl: './organization-setting.component.html',
  styleUrls: ['./organization-setting.component.scss'],
  providers: [OrganizationService]
})
export class OrganizationSettingComponent implements OnInit {

  organization: Organization = new Organization();

  kindPrefiksUE = [];

  buttonGetCustomerNIPEnable = true; 


  currencies = []

  


  public NIPMask = [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/ ];
  public kodPocztowyMask = [ /\d/, /\d/, '-', /\d/, /\d/, /\d/];


  constructor(private organizationSer: OrganizationService, private tempService: TemplatesService) { 
    this.kindPrefiksUE = tempService.getKindPrefiksUE()
    this.currencies     = tempService.getKindCurrency()

    this.organizationSer.getOrganization().subscribe(
      result => {
        this.organization = Object.assign(new Organization(), result[0])
        console.log(this.organization)
      }
    )

  }

  ngOnInit() {
  
  }


  onGetCustomerNIP() {
    this.buttonGetCustomerNIPEnable = false;


    this.organizationSer.getOrganizationNIB(this.organization.NIP ).subscribe(
    (data) => {
      this.organization = data;
      this.buttonGetCustomerNIPEnable = true; 
    },
    (err) => {
      console.log(err)
      this.buttonGetCustomerNIPEnable = true; 
    })
  }

  onAddAccount() {
    var element = {
      id: uuid(), 
      number:  "",
      name: "",
      type: 0, // 0 - bank, 1 - kassa
      currency: "pln"
    }

    if (this.organization.accounts) {
      this.organization.accounts.push(element)
    } else {
      this.organization["accounts"] = [element]
    }


    
  }

  

  onChangedLogoLink(link: string) {
    console.log("this.organization.linkToLogo = link")

    this.organization.linkToLogo = link
  }

  changeCurrentAccount(value) {
    this.organization.currentAccount = value;
  }

  onDelete(item) {

    const index = this.organization.accounts.findIndex(itemTemp => item.id === itemTemp.id); 

    if (index !== -1) {
      this.organization.accounts.splice(index, 1);
    }  

  }


  onSaveCustomer() {
    this.organizationSer.saveOrganization(this.organization)
  }

}
