import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from '@angular/fire/storage';


class ResultCurrency {
  code: String;
  currency: String;
  rates: [
    {
      effectiveDate: String;
      mid: Number;
      no: String;
    }
  ]

}

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  host = 'https://api.nbp.pl/api/exchangerates/rates/a/'

  constructor(private http: HttpClient, private afStorage: AngularFireStorage) { }


  onloadendFile(blob, callback) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      // var base64 = dataUrl.split(',')[1];
      callback(dataUrl);
    };
    reader.readAsDataURL(blob);
  };

  getPhotoBase64(linkToLogo) {

    return Observable.create(observable => {
      const ref = this.afStorage.ref(linkToLogo);
      ref.getDownloadURL().subscribe(linkToFile => {

        console.log("Read Image")

        this.http.get(linkToFile, { responseType: 'blob' }).subscribe(blob => {
          console.log(blob)
          this.onloadendFile(blob, (base64 => {
            observable.next(base64)
            observable.complete()
          }))
        },
          error => {
            observable.next(error)
            observable.error();
          })
      })
    })
  }



  //{"table":"A","currency":"euro","code":"EUR","rates":[{"no":"001/A/NBP/2019","effectiveDate":"2019-01-02","mid":4.3016}]}
  //https://api.nbp.pl/api/exchangerates/rates/a/eur/2019-01-02?format=json


  // ====== CURRENCY ==============
  getCurrencyKurs(dateDoc, currency) {
    return Observable.create(observer => {
      this.getCurrencyDate(dateDoc, currency,  observer); 
    })
  } 

  getCurrencyDate(data, currency, observer) {
    
    console.log("getCurrencyDate")

    var yesterday = data - 86400*1000;
    var yesterdayFormat = formatDate(yesterday, 'yyyy-MM-dd', 'en-US', '+0530');
    var req = this.http.get<ResultCurrency>('https://api.nbp.pl/api/exchangerates/rates/a/'+currency+"/"+yesterdayFormat+"?format=json");

    if  (currency.toUpperCase() == 'PLN') {
      observer.next("1.0");
      observer.complete();
      return;
    }

    req.subscribe((data) => {
      observer.next(data.rates[0].mid);
      observer.complete();
      return;
    }, (error) => {
      if (error.status == 404) {
        this.getCurrencyDate(yesterday, currency, observer);
        return;
      } else {
        observer.next(error);
        observer.error();
        return;
      }
    })
  }

  // ======  END CURRENCY ============

  

  //=== Summa in wors for  Infoce ============

  getSummaWords(summa) {
    return Observable.create(observer => {

      var req = this.http.get('https://cerux.herokuapp.com/getSummmaInWords?summa='+summa);
      //var req = this.http.get('http://localhost:5432/getSummmaInWords?summa='+summa);

      req.subscribe((data) => {
        observer.next(data['result']);
        observer.complete();
        return;
      }, (error) => {
        console.log(error);
        observer.next(error);
        observer.error();
        return;
        
      })

    })
  } 

  //=== End Summa in wors for  Infoce ===========



}
