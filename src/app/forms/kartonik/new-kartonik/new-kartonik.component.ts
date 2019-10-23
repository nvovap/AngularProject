import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Kartonik } from '../Kartonik';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { TovarService } from 'app/services/data/tovar.service';

@Component({
  selector: 'app-new-kartonik',
  templateUrl: './new-kartonik.component.html',
  styleUrls: ['./new-kartonik.component.scss']
})
export class NewKartonikComponent implements OnInit {

  @Input() kartonik : Kartonik = new Kartonik();
  @Input() itIsAddKartonik : Kartonik = new Kartonik();

  @Output() addNewKartonikFlagChange =  new EventEmitter<Boolean>();


  //public kartonikCode = [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/ ];

  public numberMask9d3  = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 3,
    integerLimit: 9
  })

  constructor(private tovarSer: TovarService,) { }

  ngOnInit() {
  }


  onChangedLogoLink(link) {
    this.kartonik.photoLink = link
  }


  onSaveTovar() {
    this.tovarSer.saveKartonik(this.kartonik);
    this.addNewKartonikFlagChange.emit(false);
  }

  onCancelTovar() {
    this.addNewKartonikFlagChange.emit(false);
  }

}
