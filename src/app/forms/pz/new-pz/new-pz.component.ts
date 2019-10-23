import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { v4 as uuid } from 'uuid';

import { TemplatesService } from 'app/services/data/templates.service';
import { ExternalService } from 'app/services/data/external.service';

import { ToastrService } from 'ngx-toastr';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
//import { PZComponent } from '../pz.component';

import { Tovar } from 'app/forms/tovar/tovar';
import { Customer } from 'app/forms/customers/customer';
import { DocumentsService } from 'app/services/data/documents.service';
import { TovarService } from 'app/services/data/tovar.service';
import { CustomerService } from 'app/services/data/customer.service';


// import {map, startWith} from 'rxjs/operators';
// import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-pz',
  templateUrl: './new-pz.component.html',
  styleUrls: ['./new-pz.component.scss'],
  providers: [DocumentsService, TovarService]
})
export class NewPZComponent implements OnInit {

  // [matDatepickerFilter]="myFilter"
  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }

  @Input() pz;


  //public number15Mask = [/[0-9]/,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./,/[0-9]|./];

  public numberMask9d3  = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 3,
    integerLimit: 9
  })
 
  public numberMask9d2  = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 2,
    integerLimit: 9
  })
  

  tableVAT = [];
  tableMagazyn = [];

  tovarsForSearch = [];
  customersForSearch = [];

  

  //podsumowanie = new Map();

  

  options: FormGroup;

  flagSelectCustomer = false;
  flagSelectTovar = false;




  @Output() addNewPZFlagChange =  new EventEmitter<boolean>(); 

  constructor(private documentsSer: DocumentsService, private tovarSer: TovarService, private customerSer: CustomerService, private tempService: TemplatesService, private exService: ExternalService, fb: FormBuilder, private toastr: ToastrService) { 
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  // myControl = new FormControl();
  // filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.tovarSer.getTovar().subscribe(
      querySnapshot => {
        this.tovarsForSearch = [];
        querySnapshot.forEach(dataElement => {
          var dataNewElement = Object.assign(new Tovar(), dataElement);
          this.tovarsForSearch.push(dataNewElement);
        })
      })


    this.customerSer.getCustomers().subscribe(
      querySnapshot => {
        this.customersForSearch = [];
        querySnapshot.forEach(dataElement => {
          var dataNewElement = Object.assign(new Customer(), dataElement);
          this.customersForSearch.push(dataNewElement);
        })
    })

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    
    this.exService.getCurrencyKurs(this.pz.dateInvoce, this.pz.currency).subscribe((data) => {
      console.log(data);
      this.pz.kurs= data;
    })

    this.tableVAT = this.tempService.getStawkaVAT()
    this.tableMagazyn  = this.tempService.getMagazyn()


    this.renumberTable()



  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.tovarsForSearch.filter(option =>  option.prodName.toUpperCase().includes(filterValue) || option.prodCode.toUpperCase().includes(filterValue));
   
  // }

  // ==============  SELECTION =================

  // Customrer
  onSelectCustomer(customer: Customer){
    this.pz.supplier = customer.name;
    this.pz.supplierRef = this.documentsSer.strToDocRef('customers/'+customer.NIP);
    this.pz.supplierNIP = customer.NIP;
    this.pz.city = customer.adres.miejscowosc;
    this.pz.kraj = customer.adres.kraj;
    this.flagSelectCustomer = false
  }


  onSectionCustomer() {
    this.flagSelectCustomer = true;
    document.scrollingElement.scrollTop = 30;
  }


  //Tovar
  onSelectTovar(tovar: Tovar){

    if (typeof tovar === 'string') {
      return;
    }

   
    var price = tovar.prodNetto;
   

    var VAT = 0;

    if (tovar.VAT) {
      VAT = tovar.VAT;
    }
    
    if (isNaN(VAT) || VAT === null)  {
      VAT = 0;
    }

    this.pz.tovar.push({
        id: uuid(),
        npp: this.pz.tovar.length+1,
        idTovar: tovar.prodCode,
        name: tovar.prodName,
        tovarRef: this.documentsSer.strToDocRef("tovar/" + tovar.prodCode),
        helflife: new Date(),
        magazyn: "Glowny towarów",
        quantity: 1,
        unit: tovar.prodJedno,
        priceCurrency: price,
        price: price,
        VAT: VAT,
        summa: price
    })

    this.changeKurs(); 

   // this.changeKurs()
    this.flagSelectTovar = false
  }


  onSectionTovar() {
    this.flagSelectTovar = true;
    //document.scrollingElement.scrollTop = 30;
  }


  displayTovarFn(tovar: Tovar): string | undefined {
    return undefined;
    //return tovar ? tovar.prodName : undefined;
  }

  displayCustomerFn(customer: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }


  searchStrTovar: String | Tovar = ""
  // searchFormControl = new FormControl()




  selectTovarTwo(tovar) {
    if (tovar) {
      this.onSelectTovar(tovar)
      this.searchStrTovar = ""
      // this.searchFormControl.reset()
    }
  }

  

// ============== END SELECTION =================




// =============== Change Elements =======

  triggerKindPrice() {
    this.accountTotal()
  }

  triggerCurrency() {

    this.exService.getCurrencyKurs(this.pz.dateInvoce, this.pz.currency).subscribe((data) => {
      if (data.error) {
        this.toastr.success(data.error)
      } else {
        this.pz.kurs= data;
        this.changeKurs()
      }
    })
    
  }

  onDelete(item) {

    const index = this.pz.tovar.findIndex(itemTemp => item.id === itemTemp.id); 

    if (index !== -1) {
      this.pz.tovar.splice(index, 1);
    }   

    this.renumberTable()

    this.accountTotal()

  }

  changeQuantity(item) {
    this.accountSumma(item)
    this.accountTotal()
  }

  changePriceCurrency(item) {
    this.accountSumma(item)
    this.accountTotal()
  }

  triggerKindVAT() {
    this.accountTotal()
  }

  changePrice(item) {

    var priceCurrency = item.price / Number(this.pz.kurs);
    item.priceCurrency = this.round(priceCurrency, 2);

    this.accountSumma(item)
    this.accountTotal()
  }

  changeSumma(item) {
    item.price = item.summa / item.quantity;

    var priceCurrency = item.price / Number(this.pz.kurs);
    item.priceCurrency = this.round(priceCurrency, 2);

    this.accountSumma(item)
    this.accountTotal()
  }



  changeKurs() {
    this.pz.tovar.forEach(item => {
     // console.log("change kurs " + item)
      this.accountSumma(item)
    });

    this.accountTotal()
  }

  // =============== End Change Elements =======



  // ======== ACOUNT ==========================
  accountSumma(item) {


    var price = item.priceCurrency * Number(this.pz.kurs);
    console.log(price)

    item.price = this.round(price, 2);

    item.summa = item.price * item.quantity;

  }


  accountTotal() {

    console.log("====  accountTotal  ==========")

    var podsumowanieMap = new Map();
    
    this.pz.tbSumma.netto = 0;
    this.pz.tbSumma.VAT = 0;
    this.pz.tbSumma.brutto = 0; 
    

    for(let i=0; i<this.pz.tovar.length; i++) {

      var item = this.pz.tovar[i]

      var summa = item.summa;

      var netto: number = 0;
      var brutto: number = 0;
      var VAT: number = 0; 

      if (isNaN(item.VAT) || item.VAT === null || item.VAT === "") {
        item.VAT = 0;
      }

      var  currentVAT = (1 + item.VAT / 100);

      if (this.pz.currentPrice === "netto") {
        netto  = this.round(summa, 2);
        brutto = this.round(summa * currentVAT, 2)
      } else {
        netto  = this.round(summa / currentVAT, 2);
        brutto = this.round(summa,2);
      }

      VAT = this.round(brutto - netto,2);

      this.pz.tbSumma.netto  += netto;
      this.pz.tbSumma.VAT    += VAT;
      this.pz.tbSumma.brutto += brutto;

      if (podsumowanieMap.get(item.VAT)) {
        const total = podsumowanieMap.get(item.VAT);
        netto   += total.netto;
        brutto  += total.brutto;
        VAT     += total.VAT;
      }

      podsumowanieMap.set(item.VAT, {satavkaVAT: item.VAT +" %", netto: netto, brutto: brutto, VAT: VAT})
    }


    var podsumowanie = Array.from(podsumowanieMap.values())

    this.pz.podsumowanie = []


    podsumowanie.forEach(element => {
      this.pz.podsumowanie.push(element)
    })


    this.pz.tbSumma.netto  = this.round(this.pz.tbSumma.netto,2);
    this.pz.tbSumma.VAT    = this.round(this.pz.tbSumma.VAT,2);
    this.pz.tbSumma.brutto = this.round(this.pz.tbSumma.brutto,2);

  }

  renumberTable() {
    this.pz.tovar.forEach((item, key) => {
       item.npp = key+1; 
    });
  } 

  // Math functions


  round(n, f) {
    f = Math.pow(10, f);
    return Math.round(n * f) / f;
  }


  // ======== End ACOUNT ==========================





  ///===============



  onSavePZ() {
    this.documentsSer.savePZ(this.pz);
    this.addNewPZFlagChange.emit(false);
  }


  onCancelPZ() {
    this.addNewPZFlagChange.emit(false);
  }
  

}
