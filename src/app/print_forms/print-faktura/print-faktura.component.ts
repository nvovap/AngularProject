import { Component, OnInit, Input } from '@angular/core';
import { Factura } from 'app/forms/faktura/factura';
import { FontsComponent } from 'assets/fonts/default_vfs';
import { OrganizationService } from 'app/services/data/organization.service';
import { Organization } from 'app/forms/setting/organization-setting/organization';
import { AngularFireStorage } from '@angular/fire/storage';

import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Customer } from 'app/forms/customers/customer';
import { CustomerService } from 'app/services/data/customer.service';
import { ExternalService } from 'app/services/data/external.service';



// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
//declare var jsPDF: any;




declare var default_vfs: any;


// import 'jspdf';
// import 'jspdf-autotable';
// declare let jsPDF;



@Component({
  selector: 'app-print-faktura',
  templateUrl: './print-faktura.component.html',
  styleUrls: ['./print-faktura.component.scss']
})
export class PrintFakturaComponent implements OnInit {

  organization = new Organization();

  bayer = new Customer();

  dataLogoOrgonisation

  base64ImageLogoOrganisations: string = ""

  @Input() faktura: Factura;



  constructor(private externalService: ExternalService, private http: HttpClient, private organizationSer: OrganizationService, private customerSer: CustomerService, private afStorage: AngularFireStorage) {

    ///comapnyJSON
  }

  ngOnInit() {

    console.log("comapny JSON")

    this.customerSer.getCustomerNIB(this.faktura.buyerNIP).subscribe(data => {
      this.bayer = Object.assign(new Customer(), data)
    })


    this.organizationSer.getOrganization().subscribe(
      result => {
        this.organization = Object.assign(new Organization(), result[0])
        console.log(this.organization)


        this.externalService.getPhotoBase64(this.organization.linkToLogo).subscribe(base64 => {
          this.base64ImageLogoOrganisations = base64
        }, error => {
          console.log(error)
        })

      })
  }




  downloadPDF() {

    var totalPagesExp = "{total_pages_count_string}";

    var fontSizes = {
      HeadTitleFontSize: 18,
      Head2TitleFontSize: 16,
      TitleFontSize: 14,
      SubTitleFontSize: 12,
      NormalFontSize: 10,
      SmallFontSize: 8
    };

    var lineSpacing = {
      NormalSpacing: 12,
    };

    console.log("downloadPDF")


    let doc = new jsPDF('p', 'pt');
    var fonts = new FontsComponent()

    doc.addFileToVFS("Arimo-Regular.ttf", fonts.ArimoRegular());
    doc.addFileToVFS("Arimo-Bold.ttf", fonts.ArimoBold());
    doc.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    doc.addFont("Arimo-Bold.ttf", "Arimo", "bold");


    doc.setFont('Arimo');



    var rightStartCol1 = 320;

    var pageSize = doc.internal.pageSize.height;

    var startY = 390

    var startX = 40;
    var startY = 0;

    // ==================  HEAD   ==================

    doc.addImage(this.base64ImageLogoOrganisations, 'PNG', startX, startY += 50, 100, 100);


    doc.setLineWidth(1);
    doc.line(rightStartCol1, startY + lineSpacing.NormalSpacing, rightStartCol1 + 200, startY + lineSpacing.NormalSpacing);

    doc.setFontType('bold');
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.text("Faktura VAT nr " + this.faktura.numberDoc, rightStartCol1 + 10, startY += (20 + lineSpacing.NormalSpacing), "left");


    doc.setFontType('normal');
    doc.setFontSize(fontSizes.SmallFontSize);
    doc.text("Data dostawy*: " + formatDate(this.faktura.dateSales, "dd-MM-yyyy", 'en-US'), rightStartCol1 + 10, startY += 15, "left");

    doc.setFontType('normal');
    doc.setFontSize(fontSizes.SmallFontSize);
    doc.text("Sposób zapłaty: Przelew", rightStartCol1 + 10, startY += 15, "left");

    doc.setFontType('normal');
    doc.setFontSize(fontSizes.SmallFontSize);
    doc.text("Termin płatności:  " + formatDate(this.faktura.datePaymentDeadline, "dd-MM-yyyy", 'en-US'), rightStartCol1 + 10, startY += 15, "left");


    doc.setLineWidth(1);
    startY += 50
    doc.line(startX + 10, startY, startX + 210, startY);

    doc.line(rightStartCol1, startY, rightStartCol1 + 200, startY);


    var bodyRows = [
      { nameLeft: "Sprzedawca:", nameRight: "Nabywca:" },
      { nameLeft: "", nameRight: "" },
      { nameLeft: this.organization.name, nameRight: this.faktura.buyer },
      { nameLeft: this.organization.adres.ulicaNumer, nameRight: this.bayer.adres.ulicaNumer },
      { nameLeft: this.organization.adres.kraj, nameRight: this.bayer.adres.kraj },
      { nameLeft: "NIP " + this.organization.NIP, nameRight: "NIP " + this.faktura.buyerNIP },
      { nameLeft: "Numer BDO " + this.organization.BDO, nameRight: " " },
      { nameLeft: "tel. " + this.organization.telefon1, nameRight: "tel. " + this.bayer.telefon1 },
    ]



    doc.autoTable(
      {
        theme: 'plain',
        tableLineWidth: 0,
        //theme: 'grid',

        // margin: {
        //   top: 50
        // },


        styles: {
          font: 'Arimo',
          // fontStyle: 'bold',
          fontSize: fontSizes.SmallFontSize,
          // cellWidth: 'wrap',
          halign: 'left',
          //    cellPadding: 1,
        },

        columnStyles: {
          nameLeft: { cellWidth: 'auto', halign: 'left' },
          nameRight: { cellWidth: 'auto', halign: 'left' }
        },

        body: bodyRows,


        showHead: false,
        showFoot: false,


        startY: startY += 15,


        allSectionHooks: true,


        didParseCell: function (data) {
          console.log(data)
          if (data.row.index > 1) {
            data.cell.styles.cellPadding = 1
          }
        },
        // Use for changing styles with jspdf functions or customize the positioning of cells or cell text
        // just before they are drawn to the page.
        willDrawCell: function (data) {

          console.log("=================")

          if (data.row.index === 0) {
            doc.setFontSize(fontSizes.TitleFontSize)
            doc.setFontStyle('bold');
          } else {
            doc.setFontSize(fontSizes.SmallFontSize)
            data.row.maxCellHeight = fontSizes.SmallFontSize;
          }
        },
      },
    );

    startY = doc.previousAutoTable.finalY + 10;


    //  ==================  TABLE TOVAR  ==================

    doc.setFontType('bold');
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.text("POZYCJE FACTURY", startX, startY += (20 + lineSpacing.NormalSpacing), "left");

    startY += 20;

    var columns = [
      { title: "lp.", dataKey: "npp" },
      { title: "Nazwa towaru lub usługi", dataKey: "name" },
      { title: "PKWiU", dataKey: "PKWiU" },
      { title: "Ilość", dataKey: "quantity" },
      { title: "Jednostka", dataKey: "unit" },
      { title: "Cena jend.", dataKey: "price" },
      { title: "VAT", dataKey: "VAT" },
      { title: "Wartość (netto)", dataKey: "summa" }];

    if (this.faktura.discount) {
      columns = [
        { title: "lp.", dataKey: "npp" },
        { title: "Nazwa towaru lub usługi", dataKey: "name" },
        { title: "PKWiU", dataKey: "PKWiU" },
        { title: "Ilość", dataKey: "quantity" },
        { title: "Jednostka", dataKey: "unit" },
        { title: "Cena jend.", dataKey: "price" },

        { title: "Rabat %", dataKey: "discount" },
        { title: "Po rabacie", dataKey: "priceDiscount" },


        { title: "VAT", dataKey: "VAT" },
        { title: "Wartość (netto)", dataKey: "summa" }];
    }


    var rows = []

    for (let i = 0; i < this.faktura.tovar.length; i++) {

      let str = this.faktura.tovar[i]

      if (this.faktura.discount) {
        rows.push({ npp: str.npp, name: str.name, PKWiU: str.PKWiU, quantity: str.quantity, unit: str.unit, price: str.price, discount: str.discount, priceDiscount: str.priceDiscount, VAT: str.VAT + "%", summa: str.summa })
      } else {
        rows.push({ npp: str.npp, name: str.name, PKWiU: str.PKWiU, quantity: str.quantity, unit: str.unit, price: str.price, VAT: str.VAT + "%", summa: str.summa })
      }

    }

    var options = {

      theme: 'grid',

      margin: {
        top: 50
      },

      styles: {
        font: 'Arimo',
      },

      bodyStyles: {
        overflow: 'linebreak',
        fontSize: 8,
        cellWidth: 'wrap',
        halign: 'center',
        valign: 'middle'
      },

      columnStyles: {
        name: { cellWidth: 'auto', halign: 'left' }
      },

      headStyles: {
        fontStyle: 'bold',
        fontSize: 10,
        cellWidth: 'wrap',
        halign: 'center'
      },

      startY: startY,

      didDrawPage: (data) => {

        var totalPagesExp = "{total_pages_count_string}";
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        var str = "storona " + doc.internal.getNumberOfPages()

        if (typeof doc.putTotalPages === 'function') {
          str = str + " z " + totalPagesExp;
        }

        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

        doc.setFontType('normal');
        doc.setFontSize(fontSizes.NormalFontSize);
        doc.text(str, doc.internal.pageSize.width - 80, pageHeight - 25);

        //doc.text(str, doc.internal.pageSize.width - 80, pageSize-10);

      }

    };

    doc.autoTable(columns, rows, options);
  
    startY = doc.previousAutoTable.finalY;

    doc.setFontType('normal');
    doc.setFontSize(fontSizes.NormalFontSize);

    if (startY > (pageSize - 340)) {

      doc.addPage();
      var str = "storona " + doc.internal.getNumberOfPages()

      if (typeof doc.putTotalPages === 'function') {
        str = str + " z " + totalPagesExp;
      }

      doc.text(str, doc.internal.pageSize.width - 80, pageSize - 25, "left");
      startY = 10;
    }

    doc.text("* Data dostawy rozumiana jest jako data dokonania lub zakończenia dostawy towarów/wykonania usług", startX, pageSize - 40, "left");


    doc.line(startX + 10, startY, rightStartCol1 + 200, startY);

    doc.setFontType('bold');
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.text("PODSUMOWANIE", startX, startY += (20 + lineSpacing.NormalSpacing), "left");


    var columns = [
      { title: "", dataKey: "name" },
      { title: "Stawka VAT", dataKey: "satavkaVAT" },
      { title: "Wartość netto", dataKey: "netto" },
      { title: "VAT", dataKey: "VAT" },
      { title: "Wartość brutto", dataKey: "brutto" },
    ]


    var rows = []

    rows.push({ name: "", satavkaVAT: "Stawka VAT", netto: "Wartość netto", VAT: "VAT", brutto: "Wartość brutto" })

    for (let i = 0; i < this.faktura.podsumowanie.length; i++) {
      let str = this.faktura.podsumowanie[i]
      rows.push({ name: "", satavkaVAT: str.satavkaVAT, netto: str.netto, VAT: str.VAT, brutto: str.brutto })
    }

    let bank = ""

    for (let i = 0; i < this.organization.accounts.length; i++) {
      if (this.organization.accounts[i].type == 0) {
        bank = this.organization.accounts[i].name + " " + this.organization.accounts[i].number
        if (this.organization.accounts[i].id == this.organization.currentAccount) {
          break
        }
      }
    }



    rows.push({ name: "Razem:", satavkaVAT: "", netto: this.faktura.tbSumma.netto, VAT: this.faktura.tbSumma.VAT, brutto: this.faktura.tbSumma.brutto })
    rows.push({ name: "Zapłacono:", netto: { colSpan: 4, content: 0 } })


    rows.push({ name: "Pozostało do zapłaty:", netto: { colSpan: 4, content: this.faktura.tbSumma.brutto } });
    //rows.push({ name: "Pozostało:", satavkaVAT:"", netto: "", VAT: "", brutto: this.faktura.tbSumma.brutto})
    rows.push({ name: "Słownie:", netto: { colSpan: 4, content: this.faktura.tbSumma.summaInWords } })
    rows.push({ name: "Konto bankowe:", netto: { colSpan: 4, content: bank } })
    rows.push({ name: "Uwagi:", netto: { colSpan: 4, content: this.faktura.uwagi } })


    var options2 = {

      //theme: 'grid',
      // theme: 'plain',
      tableLineWidth: 1,

      showHead: false,
      showFoot: false,

      margin: {
        top: 50
      },

      styles: {
        font: 'Arimo',

        fontStyle: 'bold',

        fontSize: fontSizes.NormalFontSize,
      },

      bodyStyles: {
        overflow: 'linebreak',
        fontSize: 10,
        cellWidth: 'wrap',
        halign: 'right',
        valign: 'middle'
      },

      columnStyles: {
        name: { fontStyle: 'bold', halign: 'right' },
        satavkaVAT: { cellWidth: 'auto', halign: 'center' }
      },

      headStyles: {
        fontStyle: 'bold',
        fontSize: 10,
        cellWidth: 'wrap',
        halign: 'center'
      },

      startY: startY += 20

    };

    doc.autoTable(columns, rows, options2);
    console.log(doc.previousAutoTable.finalY);
    console.log(doc.internal.pageSize);

    startY = doc.previousAutoTable.finalY
    doc.line(startX + 10, startY, rightStartCol1 + 200, startY);

    doc.setFontType('normal');
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("Faktura bez podpisu odbiorcy", startX, startY += 15, "left");

    doc.setFontType('normal');
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.text("Osoba upoważniona do wystawienia faktury VAT", rightStartCol1, startY, "left");
    doc.text("Oleksandr Honcharov", rightStartCol1 + 40, startY += 30, "left");

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save('table.pdf');
  }

}