import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  distanza = 50;
  nascondiPieni = false;
  prezzoMin = 0;
  prezzoMax = 500;
  dataMin = new Date();
  dataMax: Date;

  constructor() { }

  ngOnInit(): void {
  }

  verificaPrezzi(){
    if(this.prezzoMin > this.prezzoMax){
      this.prezzoMax = this.prezzoMin;
    }
  }
}
