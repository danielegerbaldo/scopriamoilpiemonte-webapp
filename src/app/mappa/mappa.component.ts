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
    var map = new Microsoft.Maps.Map('#myMap', {
      credentials: 'ArOu7EQ5tMWMGG0UsGGxRKBYx4XfoCLXsceSt6ZCkloQ3urZS6MevEBDjaKwuFv7',
      center: new Microsoft.Maps.Location(45.071222, 7.685090)
    });

    var location1 = new Microsoft.Maps.Location(45.071222, 7.685090);
    var location2 = new Microsoft.Maps.Location(45.062049, 7.697619);
    //Create custom Pushpin
    var pc = new Microsoft.Maps.Pushpin(location1, {
      title: 'Piazza Castello',
      subTitle: 'City Center',
      text: '1',
      color: 'red'
    });
    var csm = new Microsoft.Maps.Pushpin(location2, {
      title: 'Chiesa di Santa Maria',
      subTitle: 'City Center',
      text: '2',
      color: 'blue'
    });

    //Add the pushpin to the map
    map.entities.push(pc);
    map.entities.push(csm);

    //Add your post map load code here.
  }



}
