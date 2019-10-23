import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { v4 as uuid } from 'uuid';
import { Factura } from 'app/forms/faktura/factura';
import { PZ } from 'app/forms/pz/pz';
import { Observable } from 'rxjs/Observable';




export class Purchases {
  supplier: string;
  tovar: string;
  date: string;
  summa: number;
  quantity: number;
}



@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private afs: AngularFirestore, private afd: AngularFireDatabase) { }



  // === Factura ====

  getFactura() {

    const collectionFactura: AngularFirestoreCollection = this.afs.collection<Factura>('documents_fv',  ref => ref.orderBy('dateDocument', 'desc') ) 
    const returVal = collectionFactura.valueChanges()
   
    return returVal

  }


  strToDocRef(strRef) {
    return this.afs.firestore.doc(strRef);
  }


  saveFactura(data) {

    this.afs.collection('documents_fv').doc<Factura>(data.id).set(Object.assign({}, data))
      .then((docRef) => {
        console.log("Document FV written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }


  // === PZ ====

  getPZ() {
    return this.afs.collection('documents_pz',  ref => ref.orderBy('dateDocument', 'desc') ).valueChanges()
  }


  savePZ(data) {
    this.afs.collection('documents_pz').doc<PZ>(data.id).set(Object.assign({}, data))
      .then((docRef) => {
        console.log("Document PZ written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }
  
  getPZForReport() {

    return Observable.create(observable => {
      this.afs.collection('documents_pz').get().subscribe((dates) => {

        var returnArray = []
  
        for(let i=0; i < dates.docs.length; i++ ){
  
          var snapshot = dates.docs[i]
          if (snapshot.id === 'numerators') {
            continue;
          }
  
          var documenPZ = snapshot.data()
  
          for(let j=0; j < documenPZ.tovar.length; j++ ){

            var tecStr = documenPZ.tovar[j];
  
            var purchases = new Purchases()
            purchases.date = documenPZ.dateDocument.toDate()
            purchases.supplier = documenPZ.supplier
            purchases.tovar = tecStr.name
            purchases.quantity = tecStr.quantity
            purchases.summa = tecStr.summa
  
            returnArray.push(purchases)
  
          }
  
        }
  
        observable.next(returnArray)
        observable.complete()
    
      })

    })
    
  }



  getPZOldToPZNew() {

    var arrDates = [
      '2018-01-27',
      '2018-02-12',
      '2018-03-08',
      '2018-03-24',
      '2018-04-17',
      '2018-05-13',
      '2018-05-29',
      '2018-06-21',
      '2018-06-27',
      '2018-06-28',
      '2018-07-02',
      '2018-08-21',
      '2018-09-13',
      '2018-09-27',
      '2018-10-24',
      '2018-11-03',
      '2018-11-11'
    ]

    this.afd.list("tovar").valueChanges().subscribe((tovars) => {
      this.afd.list("customers").valueChanges().subscribe((customers) => {

        this.afd.list("invoice/").valueChanges().subscribe((dataDates) => {

          var data = dataDates[0];

          for (let i = 0; i < arrDates.length; i++) {
            var dateDoc = arrDates[i];
            var factura = data[dateDoc]

            for (let i = 0; i < customers.length; i++) {
              var customer = customers[i];

              if (customer['identyfikator'] in factura) {
                var tovares = factura[customer['identyfikator']];

                var dataInvoce = new Date(tovares['dataInvoiceMinusDen'] + 'T00:00:00.901Z');

                dataInvoce.setDate(dataInvoce.getDate() + 1)

                var pz = {
                  id: uuid(),
                  number: '',
                  numberDoc: '',
                  timestampServer: "",

                  dateByOrder: Number(new Date(dateDoc + 'T00:00:00.901Z')),

                  dateDocument: new Date(dateDoc + 'T00:00:00.901Z'),

                  dateInvoce: dataInvoce,

                  supplierRef: 'customers/' + customer["NIP"],
                  supplierNIP: customer["NIP"],
                  supplier: customer["nazwa"],

                  numberInvoce: tovares['invoiceNr'],

                  currentPrice: "netto",

                  city: customer["adres"]["miejscowosc"],
                  kraj: customer["adres"]["kraj"],

                  currency: "eur",
                  kurs: "1.00",
                  uwagi: "",
                  tovar: [],
                  podsumowanie: [],
                  tbSumma: { netto: 0, VAT: 0, brutto: 0 }
                }


                for (let i = 0; i < tovars.length; i++) {
                  var tovar = tovars[i];

                  if (tovar["prodCode"] in tovares) {
                    var values = tovares[tovar["prodCode"]];

                    pz.tovar.push({
                      id: uuid(),
                      npp: pz.tovar.length + 1,
                      idTovar: tovar["prodCode"],
                      name: tovar["prodName"],
                      tovarRef: "tovar/" + tovar["prodCode"],
                      helflife: new Date(),
                      magazyn: "Glowny towarów",
                      quantity: values["countInvoiceTowar"],
                      unit: tovar["prodJedno"],
                      priceCurrency: values["cenaInvoiceTowarEUR"],
                      price: "0",
                      VAT: "23",
                      summa: "0"
                    })

                  }
                }

                this.savePZ(pz)

              }
            };
          }
        })
      })
    })
  }
}
