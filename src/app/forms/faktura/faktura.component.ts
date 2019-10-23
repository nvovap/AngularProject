import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'app/services/data/documents.service';
import { Factura } from './factura';

@Component({
  selector: 'app-faktura',
  templateUrl: './faktura.component.html',
  styleUrls: ['./faktura.component.scss']
})
export class FakturaComponent implements OnInit {

  addNewFakturaFlag = false;
  tableFaktura = [];

  currentFaktura = new Factura();

  constructor(private documentsSer: DocumentsService) { }

  ngOnInit() {
    this.documentsSer.getFactura().subscribe(querySnapshot => {
      console.log('getFactura')
      
      this.tableFaktura = [];

      querySnapshot.forEach(dataElement => {
        if (dataElement["id"] != undefined) {
          var dataNewElement = Object.assign(new Factura(), dataElement, { dateDocument: dataElement['dateDocument'].toDate(), datePaymentDeadline: dataElement['datePaymentDeadline'].toDate(), dateSales: dataElement['dateSales'].toDate()});
          this.tableFaktura.push(dataNewElement);
        }
      })
    })
  }

  onAddNewFactura() {
    this.addNewFakturaFlag = true;
    this.currentFaktura = new Factura()
    this.currentFaktura.tovar = []
    this.currentFaktura.podsumowanie = []
  }

  onEditFactura(data) {

    console.log("Edit Factura")

    this.currentFaktura = data;
    this.addNewFakturaFlag = true;
  

    document.scrollingElement.scrollTop = 30

  }


  onChangedAddNewFacturaFlag(value) {
    this.addNewFakturaFlag = value;
  }

}
