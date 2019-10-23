import { Kartonik } from "../kartonik/Kartonik";

export class Tovar  {

    prodName: string = "";
    prodCode: string = "";
    nameNaParagonie: string = "";
    numerKatalogowy: string = "";
    PKWiU: string = "";
    VAT: number = 23;
    prodJedno: string = "";
    itService: boolean = false;

    termWaz: number = 0;

    prodNetto: number = 0;
    prodBrutto: number = 0;
    length: number = 0;
    width: number = 0;
    height: number = 0;

    producent: string = "";

    madeIn: string = "";



    
    
    prodEan: string = ""
  
    kartEan: string = "";
    kartDlu: number = 0;
    kartBrutto: number = 0;
    kartNetto: number = 0;
    kartWars: number = 0;
    kartWys: number = 0;
    kartPhoto: string = "";
    kartSyr: number = 0;
    kartSzt: number = 0;
  
    palWars: number = 0;
  
    prodPhoto: string = "";
    prodPhotoLink: string = "";


    boxes: Array<{
      kartonik: Kartonik;
      EAN: string;
      countToBox: number;
      hieghtInPallete: number;
    }> = []


    units: Array<{
      kindUnit: KindUnit;
      coefficient: number;
    }> = []

  
    ceny : Array<{
      cennik: string;
      netto: number ;
      brutto: number ;
      zyskNettto: number;
      narzut: number;
      marza: number;
    }> = []
  
    
  }

  export class KindUnit  {
    id: "";
    name: string ="";
  }


 