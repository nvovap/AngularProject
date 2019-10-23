import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';


class TovarTwo  {

  nameProduct: string = "";
  photoProduct: string = "";
  priceFor: string = "";

  price:  number = 0;
  reserv: number = 0;
  rest:   number = 0;
  
}


@Injectable({
  providedIn: 'root'
})

export class TovarService2 {

  constructor(private afs: AngularFirestore, private afd: AngularFireDatabase) { }


  // === tovar ====

  rewriteTovar() {
    const collectionFactura: AngularFirestoreCollection = this.afs.collection<TovarTwo>('productes_for_market')
    collectionFactura.get().forEach(dates => { 
      dates.forEach(dataL => {

        console.log(dataL.id)

        if (dataL.id !== "9N1cO0rQJs6yANIKJ95r") {
          this.saveTovar(dataL.id, Object.assign(new TovarTwo(), dataL.data()))
        }
      })
    })
  }

  saveTovar(key: string, data: TovarTwo) {
    this.afs.collection('productes_for_market').doc("9N1cO0rQJs6yANIKJ95r").collection("products").doc<TovarTwo>(key).set(Object.assign({}, data))
      .then((docRef) => {
        console.log("Document TOVAR written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding TOVAR: ", error);
      });
  }

}
