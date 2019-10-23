import { Component, OnInit } from '@angular/core';
import { Organization } from './organization-setting/organization';
import { TemplatesService } from 'app/services/data/templates.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  organization: Organization = new Organization();

  background =  'primary'

  kindPrefiksUE = [];

  buttonGetCustomerNIPEnable = true; 


  currencies = []

  constructor(private tempService: TemplatesService) { 
    this.kindPrefiksUE = this.tempService.getKindPrefiksUE()
  }

  ngOnInit() {
  }

}
