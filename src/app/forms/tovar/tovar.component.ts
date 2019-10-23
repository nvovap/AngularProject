import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TemplatesService } from 'app/services/data/templates.service';
import { TovarService } from 'app/services/data/tovar.service';
import { Tovar } from './tovar';
import { TovarService2 } from 'app/services/data/tovarReNEW.service';




@Component({
  selector: 'app-tovar',
  templateUrl: './tovar.component.html',
  styleUrls: ['./tovar.component.scss'],
  providers: [TovarService]
})
export class TovarComponent implements OnInit {

  tovars = [];
  searchStr = '';

  addNewTovarFlag = false;
  itIsAddTovar = false;

  @Input() flagSelectTovar = false;
  @Output() selectTovar =  new EventEmitter<Tovar>();

  currentTovar = new Tovar();
  

  constructor(private tempService: TemplatesService, private tovarSer: TovarService, private tovarSer2: TovarService2) { 



   

  }

  ngOnInit() {

    this.tovarSer.getTovar().subscribe(
      querySnapshot => {
        this.tovars = [];
        querySnapshot.forEach(dataElement => {
          var dataNewElement = Object.assign(new Tovar(), dataElement);
          this.tovars.push(dataNewElement);
        })
      })

      this.tovarSer2.rewriteTovar()

    //this.tovarSer.getTotalFactura();
  }

  onGetTotal() {
    //this.tovarSer.getTotalFactura()
    console.log("getOldTovars")
    this.tovarSer.getOldTovars()
  }

  onAddTovar() {

    console.log("onAddTovar")

    this.currentTovar = new Tovar();

    


    const ceniky = this.tempService.getCennik()

    ceniky.forEach(cenik => {

      this.currentTovar.ceny.push({
        cennik: cenik.name,
        netto: 0,
        brutto: 0,
        zyskNettto: 0,
        narzut: cenik.narzut,
        marza: 0
      })
      
    });


    this.addNewTovarFlag  = true;
    this.itIsAddTovar     = true;

  }


  onEditCustomer(data) {

    this.currentTovar = data;
    this.addNewTovarFlag = true;
    this.itIsAddTovar = false;

    document.scrollingElement.scrollTop = 30

  }

  onChangedAddNewTovarFlag(increased:any){
    this.addNewTovarFlag = false;
  }


  onSelectTovar(data) {
    this.selectTovar.emit(data);
  }

}
