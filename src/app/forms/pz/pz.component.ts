import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'app/services/data/documents.service';
import { PZ } from './pz';

@Component({
  selector: 'app-pz',
  templateUrl: './pz.component.html',
  styleUrls: ['./pz.component.scss'],
  providers: [DocumentsService]
})
export class PZComponent implements OnInit {

  addNewPZFlag = false;
  tablePZ = [];

  currentPZ = new PZ();

  constructor(private documentsSer: DocumentsService) { }

  ngOnInit() {


    this.documentsSer.getPZ().subscribe(querySnapshot => {
      console.log('getPZ')

      this.tablePZ = [];

      querySnapshot.forEach(dataElement => {

        if (dataElement["id"] != undefined) {
          var dataNewElement = Object.assign(new PZ(), dataElement, { dateDocument: dataElement['dateDocument'].toDate(), dateSales: dataElement['dateDocument'].toDate(), dateInvoce: dataElement['dateInvoce'].toDate() });

          for (let i = 0; i < dataNewElement.tovar.length; i++) {
            dataNewElement.tovar[i].helflife = dataElement["tovar"][i]["helflife"].toDate();
          }

          this.tablePZ.push(dataNewElement);
          
        };
      })
    })
  }

  onAddNewPZ() {
    this.addNewPZFlag = true;
    this.currentPZ = new PZ()
    this.currentPZ.tovar = []
    this.currentPZ.podsumowanie = []
  }


  onEditPZ(data) {

    console.log("Edit PZ")

    this.currentPZ = data;
    this.addNewPZFlag = true;


    document.scrollingElement.scrollTop = 30

  }


  onChangedAddNewPZFlag(value) {
    this.addNewPZFlag = value;
  }


  getOldPZ() {
    console.log('getOldPZ')
    this.documentsSer.getPZOldToPZNew()
  }
}
