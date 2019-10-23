import { v4 as uuid } from 'uuid';
import { DocumentReference } from '@angular/fire/firestore';
import { OnInit } from '@angular/core';


export class Factura  implements OnInit {

    
    ngOnInit() {
        console.log("on init Factura")

        this.tovar = []

        this.podsumowanie = []

    }


        id: String = uuid();
        number: number = 0;
        numberDoc: String = '';
        timestampServer: Date = new Date();;
        dateDocument: Date = new Date();
        dateSales: Date = new Date();
        datePaymentDeadline: Date = new Date();
        buyerNIP: String = '';
        buyer: String = '';
        //buyerRef:  String = '';
        buyerRef: DocumentReference;
        placeOfIssue: String = '';
        uwagi: string  = "";

        tovar:  Array<{
            id: String;
            npp: number;
            idTovar:  String;
            name:  String;
            tovarRef:  DocumentReference;
            //tovarRef:  String;
            PKWiU:  String;
            // magazyn: "magazyn 1",
            quantity: number;
            unit: String;
            price: number;
            priceDiscount: number;
            discount: number;
            VAT: number;
            summa: number;
        }>; 
        
        podsumowanie: Array<{ 
            satavkaVAT: String; 
            netto:      number; 
            brutto:     number; 
            VAT:        number; 
        }>;

        discount: Boolean = false;

        tbSumma: {
            netto:        number; 
            VAT:          number;
            brutto:       number; 
            paid:         number; 
            summaInWords: number;
        } = {netto: 0, 
            VAT:    0,
            brutto: 0,
            paid:   0,
            summaInWords: 0}
    
}
