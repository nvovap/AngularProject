import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor() { }


  getKindPay() {
    return [
      "Przelew",
      "Kompensata",
      "Za pobraniem",
      "Czek",
      "Karta"
    ]
  }

  getKindCurrency() {
    return [
      "pln",
      "eur",
      "usd",
    ]
  }

  getMagazyn() {
    return [
      "Glowny towarów"
    ]
  }

  getStawkaVAT() {
    return [
      {value : 23, name: '23 %'},
      {value : 8,  name: '8 %'},
      {value : 5,  name: '5 %'},
      {value : 0,  name: '0 %'},
    ]
  }

  getKindUnits() {
    return [
      {id : 'szt.',  name: 'szt.'},
      {id : 'kg.',   name: 'kg.'},
      {id : 'kart.', name: 'kart.'}
    ]
  }
  

  getCennik() {
    return [
      {id : '1', name: 'detalicny', narzut : 10}
    ]
  }


  getKindDefermentOfPay() {
    return [
      {value : '7',  name: '7 dni'},
      {value : '10', name: '10 dni'},
      {value : '14', name: '2 tygodnie'},
      {value : '31', name: '1 miesiac'}
    ]
  }


  getKindPrefiksUE() {
    return [
      {value: "AT", message: "AT-Austria"}, 
      {value: "BE", message: "BE-Belgium"},
      {value: "BG", message: "BG-Bulgaria"},
      {value: "CY", message: "CY-Cyprus"},
      {value: "CZ", message: "CZ-Czech Republic"},
      {value: "DE", message: "DE-Germany"},
      {value: "DK", message: "DK-Denmark"},
      {value: "EE", message: "EE-Estonia"},
      {value: "EL", message: "EL-Greece"},
      {value: "ES", message: "ES-Spain"},
      {value: "FI", message: "FI-Finland"},
      {value: "FR", message: "FR-France "},
      {value: "GB", message: "GB-United Kingdom"},
      {value: "HR", message: "HR-Croatia"},
      {value: "HU", message: "HU-Hungary"},
      {value: "IE", message: "IE-Ireland"},
      {value: "IT", message: "IT-Italy"},
      {value: "LT", message: "LT-Lithuania"},
      {value: "LU", message: "LU-Luxembourg"},
      {value: "LV", message: "LV-Latvia"},
      {value: "MT", message: "MT-Malta"},
      {value: "NL", message: "NL-The Netherlands"},
      {value: "PL", message: "PL-Poland"},
      {value: "PT", message: "PT-Portugal"},
      {value: "RO", message: "RO-Romania"},
      {value: "SE", message: "SE-Sweden"},
      {value: "SI", message: "SI-Slovenia"},
      {value: "SK", message: "SK-Slovakia"}
    ]
  }
}

