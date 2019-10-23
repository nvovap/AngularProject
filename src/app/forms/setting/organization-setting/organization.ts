export class Organization {
    name: string = "";
    identyfikator: string  = "";
    prefiksUE:  string  = "";
    NIP:  string  = ""; 
    BDO:  string  = ""; 
    currentAccount: string = "";

    linkToLogo: string = "";
    

    accounts: [{ 
                    id: String,
                    number:  string;
                    name: string;
                    type: Number; // 0 - bank, 1 - kassa
                    currency: string;
                }] // = [{id: "", number: "", name: "", type: 0, currency: "pln"}];

    numberKonta:  string  = "";
    nameBanku: string  = "";
      
    adres: {  
              ulicaNumer:  string;
              adresZagraniczny: boolean;
              kodPocztowy:  string;
              miejscowosc:  string;
              kraj:  string;
    } = { ulicaNumer:  "", adresZagraniczny: false, kodPocztowy:  "", miejscowosc:  "", kraj:  ""};

    
    telefon1:  string = "";
    telefon2:  string = "";
    fax:  string  = "";
    skype:  string  = "";
    adresEmail:  string  = "";
    www:  string  = "";
    uwagi: string  = "";

}