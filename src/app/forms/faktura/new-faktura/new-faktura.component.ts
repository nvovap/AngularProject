import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { DocumentsService } from 'app/services/data/documents.service';
import { TovarService } from 'app/services/data/tovar.service';
import { TemplatesService } from 'app/services/data/templates.service';

import { Customer } from 'app/forms/customers/customer';
import { Tovar } from 'app/forms/tovar/tovar';

// import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { CustomerService } from 'app/services/data/customer.service';
import { ExternalService } from 'app/services/data/external.service';


import * as jsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';



@Component({
  selector: 'app-new-faktura',
  templateUrl: './new-faktura.component.html',
  styleUrls: ['./new-faktura.component.scss']
})
export class NewFakturaComponent implements OnInit {

  flagSelectCustomer = false;
  flagSelectTovar = false;

  @Output() addNewFacturaFlagChange = new EventEmitter<boolean>();

  // @ViewChild('app-print-faktura') content: ElementRef;

  searchStrTovar: String | Tovar = ""

  // searchFormControl = new FormControl()

  tovarsForSearch = [];
  customersForSearch = [];
  tableVAT = [];

  @Input() faktura;




  // options: FormGroup;
  public numberMask9d3 = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 3,
    integerLimit: 9
  })

  public numberMask9d2 = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 2,
    integerLimit: 9
  })

  constructor(private documentsSer: DocumentsService, private tovarSer: TovarService, private customerSer: CustomerService, private tempService: TemplatesService, private exService: ExternalService) {
    // this.options = fb.group({
    //   hideRequired: false,
    //   floatLabel: 'auto',
    // });

  }

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

    this.tableVAT = this.tempService.getStawkaVAT()

  }



  // ==============  SELECTION =================

  // Customrer
  onSelectCustomer(customer: Customer) {
    this.faktura.buyer = customer.name;
    this.faktura.buyerRef = this.documentsSer.strToDocRef('customers/' + customer.NIP);
    //this.faktura.buyerRef = 'customers/'+customer.NIP;
    this.faktura.buyerNIP = customer.NIP;
    this.faktura.placeOfIssue = customer.adres.miejscowosc;

    this.flagSelectCustomer = false
  }


  onSectionCustomer() {
    this.flagSelectCustomer = true;
    document.scrollingElement.scrollTop = 30;
  }


  //Tovar
  onSelectTovar(tovar: Tovar) {

    if (typeof tovar === 'string') {
      return;
    }

    var price = tovar.prodNetto;


    var VAT = tovar.VAT;

    if (isNaN(VAT) || VAT === null)  {
      VAT = 0;
    }



    this.faktura.tovar.push({
      id: uuid(),
      npp: this.faktura.tovar.length + 1,
      idTovar: tovar.prodCode,
      name: tovar.prodName,
      tovarRef: this.documentsSer.strToDocRef("tovar/" + tovar.prodCode),
      //tovarRef: "tovar/" + tovar.prodCode,
      PKWiU: (tovar.PKWiU) ? tovar.PKWiU : "",
      // magazyn: "magazyn 1",
      quantity: 1,
      unit: tovar.prodJedno,
      price: price,
      priceDiscount: price,
      discount: 0,
      VAT: VAT,
      summa: price
    })

    this.flagSelectTovar = false
    this.accountTotal()
  }


  onSaveToPDF() {


    // const div = document.getElementById("contentForPDF");

    // const options = { background: "white" }
    // //, height: 5800, width: 4000};


    // //5800
    // html2canvas(div, options).then((canvas) => {

    //   var pdf = new jsPDF('p', 'pt', 'a4');
    //   var img = canvas.toDataURL("image/png");
    //   pdf.addImage(img, 'PNG', 10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20);

    //   pdf.save('web.pdf');


    // });


    // const elementToPrint = document.getElementById('contentForPDF'); //The html element to become a pdf
    // const pdf = new jsPDF('p', 'pt', 'a4');

    // pdf.addHTML(elementToPrint.innerHTML, () => {
    //   pdf.save('web.pdf');
    // });

    // const div = document.getElementById("contentForPDF");
    // //const options = {background: "white", height: div.clientHeight, width: div.clientWidth};

    // html2canvas(div).then((canvas) => {

    //   //document.body.appendChild(canvas);


    //     //Initialize JSPDF
    //     let doc = new jsPDF("p", "mm", "a4");
    //     //Converting canvas to Image
    //     let imgData = canvas.toDataURL("image/PNG");
    //     //Add image Canvas to PDF
    //     doc.addImage(imgData, 'PNG', 20, 20);

    //     let pdfOutput = doc.output();
    //     // using ArrayBuffer will allow you to put image inside PDF
    //     let buffer = new ArrayBuffer(pdfOutput.length);
    //     let array = new Uint8Array(buffer);
    //     for (let i = 0; i < pdfOutput.length; i++) {
    //         array[i] = pdfOutput.charCodeAt(i);
    //     }

    //     //Name of pdf
    //     const fileName = "example.pdf";

    //     // Make file
    //     doc.save(fileName);
    //     //doc.output("dataurlnewwindow");

    // });
  }

  onSectionTovar() {
    this.flagSelectTovar = true;
    //document.scrollingElement.scrollTop = 30;
  }


  displayTovarFn(tovar: Tovar): string | undefined {
    return undefined
    //eturn tovar ? tovar.prodName : undefined;
  }

  displayCustomerFn(customer: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }




  selectTovarTwo(tovar: Tovar) {
    if (tovar) {
      this.onSelectTovar(tovar)
      this.searchStrTovar = undefined
      //this.searchFormControl.reset() 
    }
  }

  closedSelectTovar() {
    console.log('closed tovar')
  }

  // ============== END SELECTION =================


  // =============== Change Elements =======



  onDelete(item) {

    const index = this.faktura.tovar.findIndex(itemTemp => item.id === itemTemp.id);

    if (index !== -1) {
      this.faktura.tovar.splice(index, 1);
    }

    this.renumberTable()

    this.accountTotal()

  }

  changeQuantity(item) {
    this.accountSumma(item)
    this.accountTotal()
  }


  changeDiscount(item) {
    this.accountSumma(item)
    this.accountTotal()
  }


  triggerKindVAT() {
    this.accountTotal()
  }

  changePrice(item) {
    this.accountSumma(item)
    this.accountTotal()
  }

  changePriceDiscount(item) {

    var currentDiscount = (1 + Number(item.discount) / 100);

    var price = item.priceDiscount * currentDiscount;

    item.price = this.round(price, 2);

    this.accountSumma(item)
    this.accountTotal()
  }


  changeSumma(item) {
    item.price = this.round(item.summa / item.quantity, 2);

    this.accountSumma(item)
    this.accountTotal()
  }



  changeKurs() {
    this.faktura.tovar.forEach(item => {
      // console.log("change kurs " + item)
      this.accountSumma(item)
    });

    this.accountTotal()
  }

  // =============== End Change Elements =======


  // ======== ACOUNT ==========================
  accountSumma(item) {

    var currentDiscount = (1 + Number(item.discount) / 100);

    var priceDiscount = item.price / currentDiscount;


    item.priceDiscount = this.round(priceDiscount, 2);

    item.summa = item.priceDiscount * item.quantity;

  }


  accountTotal() {
    console.log("accountTotal")

    var podsumowanieMap = new Map();

    this.faktura.tbSumma.netto = 0;
    this.faktura.tbSumma.VAT = 0;
    this.faktura.tbSumma.brutto = 0;

    this.faktura.discount = false;

   
    for(let i=0; i<this.faktura.tovar.length; i++) {

      var item = this.faktura.tovar[i]
      var summa = Number(item.summa);

      var netto = 0;
      var brutto = 0;
      var VAT = 0;

      item.VAT = Number(item.VAT)

      if (isNaN(item.VAT) || item.VAT === null || item.VAT === "") {
        item.VAT = 0;
      }

      var currentVAT = (1 + Number(item.VAT) / 100);

      if (item.discount > 0) {
        this.faktura.discount = true;
      }


      netto = this.round(summa, 2);
      brutto = this.round(summa * currentVAT, 2)


      VAT = this.round(brutto - netto, 2);

      this.faktura.tbSumma.netto += netto;
      this.faktura.tbSumma.VAT += VAT;
      this.faktura.tbSumma.brutto += brutto;

      if (podsumowanieMap.get(item.VAT)) {
        const total = podsumowanieMap.get(item.VAT);
        netto += total.netto;
        brutto += total.brutto;
        VAT += total.VAT;
      }

      podsumowanieMap.set(item.VAT, { satavkaVAT: item.VAT + " %", netto: netto, brutto: brutto, VAT: VAT })
    }


    var podsumowanie = Array.from(podsumowanieMap.values())

    this.faktura.podsumowanie = []

    podsumowanie.forEach(element => {
      this.faktura.podsumowanie.push(element)
    })


    this.faktura.tbSumma.netto = this.round(this.faktura.tbSumma.netto, 2);
    this.faktura.tbSumma.VAT = this.round(this.faktura.tbSumma.VAT, 2);
    this.faktura.tbSumma.brutto = this.round(this.faktura.tbSumma.brutto, 2);

  }

  renumberTable() {
    this.faktura.tovar.forEach((item, key) => {
      item.npp = key + 1;
    });
  }

  // Math functions


  round(n, f) {
    f = Math.pow(10, f);
    return Math.round(n * f) / f;
  }


  // ======== End ACOUNT ==========================


  ///===============



  onSaveFactura() {

    this.exService.getSummaWords(this.faktura.tbSumma.brutto).subscribe((summaInWords) => {
      this.faktura.tbSumma.summaInWords = summaInWords;
      this.documentsSer.saveFactura(this.faktura);
      this.addNewFacturaFlagChange.emit(false);
    }, (error) => {
      this.documentsSer.saveFactura(this.faktura);
      this.addNewFacturaFlagChange.emit(false);
    })

  }


  onCancelFactura() {
    this.addNewFacturaFlagChange.emit(false);
  }



}
