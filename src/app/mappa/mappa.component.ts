import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { EventiService } from "../../services/eventi.service";
import { Evento } from "../../models/data.model"

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements OnInit {

  @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
  //listaEventi : Evento[] = [];
  colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
  map;

  constructor(private eventiService : EventiService) { }

  ngOnInit(): void {
    this.getEventi();
    if (typeof Microsoft !== 'undefined') {
      console.log('BingMapComponent.ngOnInit');
      this.loadMap();
    }
  }

  ngOnChanges(changes : SimpleChanges){
    console.log("changes");
    
  }

  getEventi(){
    this.eventiService.getEventi()
        .subscribe(eventi => this.drawPins(eventi));
  }

  drawPins = (eventi : Evento[]) => {
    this.map.entities.clear();
    for(let ev of eventi){
      this.map.entities.push(
        new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(
            ev.latitudine, ev.longitudine
          ),
          {
            title: "" + ev.nome,
            color: this.colors[Math.random() * this.colors.length>>0]
          }
        )
      );
    }
  }

  loadMap() {
    this.map = new Microsoft.Maps.Map('#myMap', {
      credentials: 'ArOu7EQ5tMWMGG0UsGGxRKBYx4XfoCLXsceSt6ZCkloQ3urZS6MevEBDjaKwuFv7',
      center: new Microsoft.Maps.Location(45.071222, 7.685090)
    });
  }



}
