import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TemplatesService } from 'app/services/data/templates.service';
import { TovarService } from 'app/services/data/tovar.service';
import { PKWiUService } from 'app/services/data/pkwiu.service';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Tovar } from '../tovar';

@Component({
  selector: 'app-new-tovar',
  templateUrl: './new-tovar.component.html',
  styleUrls: ['./new-tovar.component.scss'],
  providers: [TovarService]
})

export class NewTovarComponent implements OnInit {

  @Input() tovar : Tovar;
  @Input() itIsAddTovar = false;
  @Output() addNewTovarFlagChange =  new EventEmitter<Boolean>();
  
  tableVAT = [];
  tableJednostka = [];

  elementsPKWiUForSearch = [];



  currentCena = {cennik: "", netto: "", brutto: "", zyskNettto: "", narzut: "", marza: ""}
  currentBox = {kartonik: "", EAN: "", countToBox: "", hieghtInPallete: ""}


  constructor(private tempService: TemplatesService, private tovarSer: TovarService, private classPKWiUService: PKWiUService) { }

  ngOnInit() {
    console.log("ngOnInit")
    this.tableVAT         = this.tempService.getStawkaVAT()
    this.tableJednostka   = this.tempService.getKindUnits()
    this.elementsPKWiUForSearch   = this.classPKWiUService.getPKWiU()
  }


  public numberMask9d2 = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 2,
    integerLimit: 9
  })


  public numberMask9d = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: false,
    decimalLimit: 0,
    integerLimit: 9
  })

  displayPKWiUFn(sPKWiU): string  {

    var returnStr = "";

    if (sPKWiU) {
      returnStr = sPKWiU.code;
    }

    return returnStr

  }


  // =============  BOX 
  onDeleteBox(item) {

    console.log("==== onDelete ====")

    const index = this.tovar.boxes.findIndex(itemTemp => item.kartonik === itemTemp.kartonik);

    if (index !== -1) {
      this.tovar.boxes.splice(index, 1);
    }

  }


  onSaveBox(currentBox) {
    this.tovar.boxes.push(currentBox)
    this.currentBox = {kartonik: "", EAN: "", countToBox: "", hieghtInPallete: ""}
  }


  // ============= CENTY OPera
  onDelete(item) {

    console.log("==== onDelete ====")

    const index = this.tovar.ceny.findIndex(itemTemp => item.cennik === itemTemp.cennik);

    if (index !== -1) {
      this.tovar.ceny.splice(index, 1);
    }

  }


  onSaveCena(currentCena) {
    this.tovar.ceny.push(currentCena)
    this.currentCena = {cennik: "", netto: "", brutto: "", zyskNettto: "", narzut: "", marza: ""}
  }

  changeNetto(item) {

  }

  changeBrutto(item) {
    
  }


  changeZyskNettto(item) {
    
  }


  changeNarzut(item) {
    
  }

  changeMarza(item) {
    
  }

  onSaveTovar() {
    this.tovarSer.saveTovar(this.tovar);
    this.addNewTovarFlagChange.emit(false);
  }

  onCancelTovar() {
    this.addNewTovarFlagChange.emit(false);
  }

  onChangedLogoLink(link: string) {
    console.log(link)
    this.tovar.prodPhotoLink = link
  }

}
