export class Customer {
    name: string = "";
    identyfikator: string  = "";
    prefiksUE:  string  = "";
    NIP:  string  = ""; //integer
    BDO:  string  = ""; 
    dostawca: boolean = false;
    odbiorca: boolean = false;
    kontrahentJestOsobaFizyczna: boolean = false;
    zgodaNaOtrzymywanieEFaktur: boolean  = false;
    zgodaNaPrzetwarzanieWCelachMarketingowych: boolean  = false;
    numberKonta:  string  = "";
    nameBanku: string  = "";
    swift: string = "";
      
    adres: {  
              ulicaNumer:  string;
              adresZagraniczny: boolean;
              kodPocztowy:  string;
              miejscowosc:  string;
              kraj:  string;
    } = { ulicaNumer:  "", adresZagraniczny: false, kodPocztowy:  "", miejscowosc:  "", kraj:  ""};
    
    adresKorespondencyjny: {  
              ulicaNumer:  string;
              adresZagraniczny:  boolean,
              kodPocztowy:  string;
              miejscowosc:  string;
              kraj:  string;
    }= { ulicaNumer:  "", adresZagraniczny: false, kodPocztowy:  "", miejscowosc:  "", kraj:  ""};
    
    adresDelivery: {  
              ulicaNumer:  string;
              adresZagraniczny:  boolean,
              kodPocztowy:  string;
              miejscowosc:  string;
              kraj:  string;
    } = { ulicaNumer:  "", adresZagraniczny: false, kodPocztowy:  "", miejscowosc:  "", kraj:  ""};
    
    
    telefon1:  string = "";
    telefon2:  string = "";
    fax:  string  = "";
    skype:  string  = "";
    adresEmail:  string  = "";
    wysylajFakturyNaObaAdresyEmail:  boolean = false;
    emailFaktury:  string  = "";
    www:  string  = "";
    uwagi: string  = "";

}

//name