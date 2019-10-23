import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Tovar } from 'app/forms/tovar/tovar';
import { Kartonik } from 'app/forms/kartonik/Kartonik';





@Injectable({
  providedIn: 'root'
})
export class TovarService {

  constructor(private afs: AngularFirestore, private afd: AngularFireDatabase) { }



  // getKindBoxes() {

  //   const collectionFactura: AngularFirestoreCollection = this.afs.collection<KindBox>('KindBoxes')
  //   const returVal = collectionFactura.valueChanges()

  //   return returVal

  // }

  // saveKindBoxes(data: KindBox) {
  //   this.afs.collection('KindBoxes').doc<KindBox>(data.id).set(Object.assign({}, data))
  //     .then((docRef) => {
  //       console.log("Document KindBoxes written with ID: ", docRef);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding KindBoxes: ", error);
  //     });
  // }



  // === Kartonik ====

  getKartonik() {

    const collectionFactura: AngularFirestoreCollection = this.afs.collection<Kartonik>('kartonik')
    const returVal = collectionFactura.valueChanges()

    return returVal

  }

  saveKartonik(data: Kartonik) {
    this.afs.collection('kartonik').doc<Kartonik>(data.code).set(Object.assign({}, data))
      .then((docRef) => {
        console.log("Document Kartonik written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding Kartonik: ", error);
      });
  }

  // === tovar ====

  getTovar() {

    const collectionFactura: AngularFirestoreCollection = this.afs.collection<Tovar>('tovars')
    const returVal = collectionFactura.valueChanges()

    return returVal

  }

  saveTovar(data: Tovar) {
    this.afs.collection('tovars').doc<Tovar>(data.prodCode).set(Object.assign({}, data))
      .then((docRef) => {
        console.log("Document TOVAR written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding TOVAR: ", error);
      });
  }



  getOldTovars() {
    this.afd.list<Tovar>("tovar").valueChanges().forEach(dates => {
      dates.forEach(data => {

        var tovarForSave = new Tovar()

        tovarForSave.VAT = Number(data['VAT'])
        tovarForSave.prodNetto = Number(data['prodNetto'])
        tovarForSave.termWaz = Number(data['termWaz'])
        tovarForSave.kartNetto = Number(data['kartNetto'])
        tovarForSave.kartBrutto = Number(data['kartBrutto'])


        tovarForSave.kartPhoto = data['kartPhoto']
        tovarForSave.kartDlu = Number(data['kartDlu'])
        tovarForSave.kartSyr = Number(data['kartSyr'])
        tovarForSave.kartSzt = Number(data['kartSzt'])
        tovarForSave.kartWars = Number(data['kartWars'])
        tovarForSave.kartWys = Number(data['kartWys'])
        tovarForSave.palWars = Number(data['palWars'])


        tovarForSave.kartEan = data['kartEan']
        tovarForSave.prodEan = data['prodEan']
        tovarForSave.prodJedno = data['prodJedno']
        tovarForSave.prodPhoto = data['prodPhoto']
        tovarForSave.prodName = data['prodName']

        tovarForSave.madeIn = data['madeIn']
        tovarForSave.prodCode = data['prodCode']



        this.saveTovar(tovarForSave);
      })
    })
  }


  getArrayTovars() {
    return Observable.create(observable => {
      var tovars = []

      this.afs.collection('tovars').get().subscribe(async (results) => {

        await results.forEach(tovar => {
          tovars.push(tovar.data())
          console.log(tovar)
        })

        await results.docs.forEach(tovar => {
          console.log(tovar)
        })


        // for(let i=0; i<results.docs.length; i++) {
        //   tovars.push(results.docs[i])
        // }


        observable.next(tovars)
        observable.complete()
      })

    })
  }

  getTotalFactura() {

    console.log("=======================")

    this.getArrayTovars().subscribe((tovars) => {

      var tovarsTotalMap = new Map();

      this.afd.list("invoice/polcpXu6bUbc1s7VdSzx0WtrgyL2/").valueChanges().subscribe((data) => {
        var prodes = ['Druzhkovskaya', 'KRIOLIT', 'LAGODA', 'LUKAS', 'VISTA', 'ZASLAVL', 'ZKF', 'ZKF SRO']


        for (let i = 0; i < data.length; i++) {
          var factura = data[i]

          for (let i = 0; i < prodes.length; i++) {
            var prod = prodes[i];

            if (prod in factura) {
              var tovares = factura[prod];

              for (let i = 0; i < tovars.length; i++) {
                var tovar = tovars[i];

                if (tovar["prodCode"] in tovares) {
                  var values = tovares[tovar["prodCode"]];

                  var roolsSales = {
                    producer: prod,
                    tovarCode: tovar["prodCode"],
                    tovarName: tovar["prodName"],
                    cenaInvoiceTowarEUR: values["cenaInvoiceTowarEUR"],
                    countInvoiceTowar: values["countInvoiceTowar"],
                    razemEUR: values["razemEUR"],
                    razemPLN: values["razemPLN"],

                  }

                  // const tovarRef =  this.afd.database.ref(`sales/`+prod);
                  // tovarRef.update(roolsSales,(error)=> {})

                  var countInvoiceTowar = Number(roolsSales.countInvoiceTowar);
                  var razemEUR = Number(roolsSales.razemEUR);
                  var razemPLN = Number(roolsSales.razemPLN);


                  if (tovarsTotalMap.get(roolsSales.tovarCode)) {
                    const total = tovarsTotalMap.get(roolsSales.tovarCode);
                    countInvoiceTowar += total.countInvoiceTowar;
                    razemEUR += total.razemEUR;
                    razemPLN += total.razemPLN;
                  }

                  tovarsTotalMap.set(roolsSales.tovarCode, { tovarCode: roolsSales.tovarCode, tovarName: roolsSales.tovarName, countInvoiceTowar: countInvoiceTowar, razemEUR: razemEUR, razemPLN: razemPLN })

                }
              }
            }
          };

        }

        console.log(tovarsTotalMap.values())

        var arrSales = Array.from(tovarsTotalMap.values())
        var sales = 'nn\tcode\tname\tcount\trazemEUR\trazemPLN'

        for (let i = 0; i < arrSales.length; i++) {
          var element = arrSales[i];
          sales += '\n' + (i + 1) + '\t' + element.tovarCode + '\t' + element.tovarName + '\t' + element.countInvoiceTowar + '\t' + element.razemEUR + '\t' + element.razemPLN;
        }

        console.log(sales)

      })

    })

  }




}
