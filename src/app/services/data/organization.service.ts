import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { Organization } from 'app/forms/setting/organization-setting/organization';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private auth: AuthenticationService, private afs: AngularFirestore, private http: HttpClient) { }


  getOrganization() {
   // return this.afd.object(`organizations/1`).valueChanges()

    this.auth.getUser().then(data => {
      console.log(data)
    })

    const collectionFactura: AngularFirestoreCollection = this.afs.collection<Organization>('organizations', ref => ref.where("NIP", "==", "5213672246") ) 
    const returVal = collectionFactura.valueChanges()

    return  returVal
  }


  saveOrganization(data) {

    var organization = Object.assign({}, data);

    this.afs.collection('organizations').doc(data.NIP).set(organization)
      .then((docRef) => {
        console.log("Document ORGANISATION written with ID: ", docRef);
      }).catch(error => {
        console.log("Error adding ORGANISATION: ", error);
      }); 
      // .catch((error) => {
      //   console.error("Error adding CUSTOMERS: ", error);
      // });
   
  }

  
  getOrganizationNIB(NIB) {
    return this.http.get<Organization>('https://cerux.herokuapp.com/getOrganizationNIP?nip=' + NIB)
  }



  // var file: File = inputValue.files[0];
  // var myReader: FileReader = new FileReader();

  // myReader.onloadend = (e) => {
  //     this.propagateChange(myReader.result);
  //     this.selectedFileName = file.name;
  // }
  // myReader.readAsDataURL(file);


}
