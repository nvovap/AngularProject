import { Component, OnInit } from '@angular/core';
import { TemplatesService } from 'app/services/data/templates.service';
import { KindUnit } from '../tovar/tovar';

@Component({
  selector: 'app-kind-unit',
  templateUrl: './kind-unit.component.html',
  styleUrls: ['./kind-unit.component.scss']
})
export class KindUnitComponent implements OnInit {

  units = []

  currentIDKindUnitEdit = ""
  currentKindUnitAdd = new KindUnit()

  editUnitFlag =  false
  flagSelectUnit = false

  constructor(private tempService: TemplatesService) { 
    this.units = tempService.getKindUnits()
  }

  ngOnInit() {
  }

  onEditUnit(kindUnit) {
    console.log("onEditUnit ", kindUnit)

    this.editUnitFlag =  true
    this.currentIDKindUnitEdit  = kindUnit.id
  }

  

  onSaveUnit(currentKindUnit) {
    
    if (this.editUnitFlag ==  false) {
      this.units.push(currentKindUnit)
    }

    this.currentIDKindUnitEdit  = ""
    this.editUnitFlag =  false;
    this.currentKindUnitAdd = new KindUnit()

   // this.tovarService.saveKindUnites(currentKindUnit)
  
  }

}
