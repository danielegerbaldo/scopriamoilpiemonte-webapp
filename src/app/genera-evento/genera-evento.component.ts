import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Evento } from "../../models/data.model";
import { EventiService } from "../../services/eventi.service";
import { UserService } from "../../services/user.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
//import { DomSanitizer } from '@angular/platform-browser';
//import * as angular from "angular";
//declare var angular : any;

// declare global {
//   const angular: typeof angular;
// }

@Component({
  selector: 'app-genera-evento',
  templateUrl: './genera-evento.component.html',
  styleUrls: ['./genera-evento.component.css']
})
export class GeneraEventoComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  BingMapsAPIKey = 'ArOu7EQ5tMWMGG0UsGGxRKBYx4XfoCLXsceSt6ZCkloQ3urZS6MevEBDjaKwuFv7';
  map = null;
  pin = null;

  @ViewChild('myMap') myMap : ElementRef<HTMLDivElement>; // using ViewChild to reference the div instead of setting an id

  evento: Evento = {
    "id": null,
    "nome": "",
    "descrizione": "",
    "note": "Created in webapp form",
    "numMaxPartecipanti": 1000,
    "partecipantiMin": 0,
    "partecipanti": 0,
    "prezzo": 0,
    "data": null,
    "streaming": false,
    "tipoEvento": {
      "nome": "bo",
      "descrizione": "bo"
    },
    "indirizzo": "",
    "latitudine": 0,
    "longitudine": 0,
    "proprietario": 1,
    "comune": 1
  };
  submitted = false;
  posting = false;

  constructor(private eventiService : EventiService, private userService : UserService, private http: HttpClient) { }

  ngOnInit(): void {}

  ngAfterViewInit(){
    if (typeof Microsoft !== 'undefined') {
      console.log('BingMapComponent.ngOnInit');
      this.loadMap();
    }
  }

  loadMap(){
    this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: this.BingMapsAPIKey,
      center: new Microsoft.Maps.Location(45.071222, 7.685090)
    });
    Microsoft.Maps.Events.addHandler(this.map, "click", this.getCoordinates);
  }

  getCoordinates = (event) => {
    if (event.targetType == "map") {
      //console.log(this.evento);
      var point = new Microsoft.Maps.Point(event.getX(), event.getY());
      var loc = event.target.tryPixelToLocation(point);
      this.evento.latitudine = loc.latitude;
      this.evento.longitudine = loc.longitude;
      this.pin = new Microsoft.Maps.Pushpin(loc, {
        title: '' + this.evento.nome,
        color: 'red'
      });
      this.map.entities.clear();
      this.map.entities.push(this.pin);
    }
  }

  onSubmit = () => { 
    this.posting = true;
    Microsoft.Maps.loadModule(
      'Microsoft.Maps.Search',
      this.loadSearch);
  }

  loadSearch = () => {
    var searchManager = new Microsoft.Maps.Search.SearchManager(this.map);
    var searchRequest = {
      location: new Microsoft.Maps.Location(this.evento.latitudine, this.evento.longitudine),
      callback: this.searchCallback,
      errorCallback: function (e) {
        console.log(e);
      }
    }
    searchManager.reverseGeocode(searchRequest);
  }

  searchCallback = (r) => {
    //console.log(r);
    this.evento.indirizzo = r.address.addressLine;
    // this.evento.comune = r.address.locality
    console.log(this.evento);
    this.eventiService.addEvento(this.evento).subscribe(
      () => this.submitted = true
    )
  }
}
