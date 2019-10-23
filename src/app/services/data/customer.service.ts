import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Customer } from 'app/forms/customers/customer';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private afs: AngularFirestore, private afd: AngularFireDatabase, private http: HttpClient) { }
  

  getCustomers() {

    const collectionFactura: AngularFirestoreCollection = this.afs.collection<Customer>('customers' ) 
    const returVal = collectionFactura.valueChanges()
   
    return returVal

  }


  saveCustomer(data) {

    var customer = Object.assign({}, data);

    this.afs.collection('customers').doc<Customer>(data.NIP).set(customer)
      .then((docRef) => {
        console.log("Document CUSTOMERS written with ID: ", docRef);
      })
      .catch((error) => {
        console.error("Error adding CUSTOMERS: ", error);
      });

  }


  getOldCustomer() {
    this.afd.list("producer/polcpXu6bUbc1s7VdSzx0WtrgyL2").valueChanges().subscribe((customeres) => {
      customeres.forEach((cusromer) => {
        var dataNewElement = Object.assign(new Customer(), cusromer, { NIP: cusromer["kontoProducer"],  nameBanku: cusromer["bankProducer"], numberKonta: cusromer["kontoProducer"], swift: cusromer["swiftProducer"], identyfikator: cusromer["nazwaKProducer"] , name: cusromer["nazwaPProducer"]});
        this.saveCustomer(dataNewElement)
      })

    })
  }


  getCustomerNIB(NIB) {

    //return this.http.get<Customer>('https://us-central1-cerux-1.cloudfunctions.net/app/getCustomerNIP?nip=' + NIB );
    // return this.http.get<Customer>('http://localhost:5432/getCustomerNIP?nip=' + NIB ); 

    //ref.where('state', '>=', 'CA')


    //return this.afd.list("customers", ref => ref.orderByChild("NIP").equalTo(NIB))

    return Observable.create(observer => {
      //this.afd.database.ref().child('customers').orderByChild('NIP').equalTo(NIB).on("value",(snapshot)=>{ // is it customer to firebase
      this.afs.collection("customers").doc(NIB).get().subscribe((snapshot) => { // is it customer to firebase
        console.log('customers from AFD');
        console.log(snapshot.data());

        if (snapshot.data() == null) { //it is not  find out external service 


          // const options =  {headers : {'Access-Control-Allow-Headers': 'Content-Type',
          //                            'Access-Control-Allow-Methods': 'GET',
          //                            'Access-Control-Allow-Origin': '*'}}

          this.http.get<Customer>('https://cerux.herokuapp.com/getCustomerNIP?nip=' + NIB).subscribe(data => {
            // this.http.get<Customer>('http://localhost:5432/getCustomerNIP?nip=' + NIB ).subscribe(data => {
            observer.next((data as Customer));
            observer.complete();
          }, error => {
            observer.error(error);
            observer.complete();
          })
        } else {
          observer.next((snapshot.data() as Customer));
          observer.complete();
        }

      })
    })

    //https://us-central1-cerux-1.cloudfunctions.net/app/getCustomerNIP?nip=5213672246

  }

}


// ssh ceruxsp@ceruxsp.name.pl


// psql -h sql.ceruxsp.name.pl -p 5432 -U ceruxsp_test -W LexGroup2018 ceruxsp_test