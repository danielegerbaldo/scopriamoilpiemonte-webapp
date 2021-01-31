import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  distanza = 50;

  constructor() { }

  ngOnInit(): void {
  }

  setDistance(val: number){
    this.distanza = val;
  }

  confermaDistanza(val: number){
    console.log("distanza: " + val + "km");
  }

}
