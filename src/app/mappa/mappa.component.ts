import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {

  @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id

  constructor() { }

  ngOnInit(): void {
    if (typeof Microsoft !== 'undefined') {
      console.log('BingMapComponent.ngOnInit');
      this.loadMap();
    }
  }

  loadMap() {
    this.myMap = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'ArOu7EQ5tMWMGG0UsGGxRKBYx4XfoCLXsceSt6ZCkloQ3urZS6MevEBDjaKwuFv7',
    });
  }



}
