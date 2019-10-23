import { v4 as uuid } from 'uuid';
import { DocumentReference } from '@angular/fire/firestore';

export class PZ {
    id: String = uuid();
    number: number = 0;
    numberDoc: String = '';
    timestampServer: Date = new Date();;
    dateDocument: Date = new Date();
    dateInvoce: Date = new Date();
    numberInvoce: String = '';
    currentPrice: String = 'netto';

    supplierNIP: String = '';
    supplier: String = '';
    supplierRef: DocumentReference;

    city: String = '';
    kraj: String = '';
    currency: String = 'pln';
    kurs: number = 1.0;

    uwagi: string  = "";

    tovar: Array<
    {
        id: String;
        npp: number;
        idTovar:  String;
        name:  String;
        tovarRef:  DocumentReference;
        helflife:  Date;
        magazyn: String;
        quantity: number;
        unit: String;
        priceCurrency: number;
        price: number;
        VAT: number;
        summa: number;
    }> = []; 
    
    podsumowanie: Array<{
        netto: number; 
        brutto:  number; 
        VAT:  number; 
    }> = [];

    tbSumma: {
        netto:        number; 
        VAT:          number; 
        brutto:       number ; 
        paid:         number;
    } = {
        netto:        0, 
        VAT:          0, 
        brutto:       0,
        paid:         0
    }

}

class tbSumma {
    netto:        number = 0; 
    VAT:          number = 0; 
    brutto:       number = 0; 
    paid:         number = 0;
}



