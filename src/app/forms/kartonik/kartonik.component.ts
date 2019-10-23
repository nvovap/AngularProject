import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TovarService } from 'app/services/data/tovar.service';
import { Kartonik } from './Kartonik';

@Component({
  selector: 'app-kartonik',
  templateUrl: './kartonik.component.html',
  styleUrls: ['./kartonik.component.scss']
})
export class KartonikComponent implements OnInit {

  kartonik = [];
  

  addNewKartonikFlag = false;
  itIsAddKartonik = false;

  @Input() flagSelectKartonik = false;
  @Output() selectKartonik =  new EventEmitter<Kartonik>();

  currentKartonik = new Kartonik();

  constructor(private tovarSer: TovarService) { }

  ngOnInit() {
    this.tovarSer.getKartonik().subscribe(
      querySnapshot => {
        this.kartonik = [];
        querySnapshot.forEach(dataElement => {
          var dataNewElement = Object.assign(new Kartonik(), dataElement);
          this.kartonik.push(dataNewElement);
        })
      })
  }

  onAddKartonik() {
    this.currentKartonik = new Kartonik();

    this.addNewKartonikFlag  = true;
    this.itIsAddKartonik     = true;

  }


  onEditKartonik(data) {

    this.currentKartonik = data;
    this.addNewKartonikFlag = true;
    this.itIsAddKartonik = false;

    // document.scrollingElement.scrollTop = 30

  }

  onChangedAddNewKartonikFlag(increased:any){
    this.addNewKartonikFlag = false;
  }


  onSelectKartonik(data) {
    this.selectKartonik.emit(data);
  }

}
