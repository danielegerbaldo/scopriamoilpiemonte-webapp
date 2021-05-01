import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id

  evento: Evento = {
    "id": null,
    "nome": "",
    "descrizione": "",
    "numMaxPartecipanti": 1000,
    "partecipantiMin": 0,
    "partecipanti": 0,
    "prezzo": 0,
    "data": null,
    "liveStreaming": false,
    "indirizzo": "",
    "latitudine": 0,
    "longitudine": 0,
    "tipo": "",
    "tema": "",
    "ricorrenza": "",
    "immagine": null,
    "luogo": ""
  };
  submitted = false;

  constructor(private eventiService : EventiService, private userService : UserService, private http: HttpClient) { }

  ngOnInit(): void {
    if (typeof Microsoft !== 'undefined') {
      console.log('BingMapComponent.ngOnInit');
      this.loadMap();
    }
  }

  loadMap(){
    this.map = new Microsoft.Maps.Map('#myMap', {
      credentials: this.BingMapsAPIKey,
      center: new Microsoft.Maps.Location(45.071222, 7.685090)
    });
    Microsoft.Maps.Events.addHandler(this.map, "click", this.getCoordinates);
  }

  getCoordinates = (event) => {
    if (event.targetType == "map") {
      console.log(this.evento);
      var point = new Microsoft.Maps.Point(event.getX(), event.getY());
      var loc = event.target.tryPixelToLocation(point);
      this.evento.latitudine = loc.latitude;
      this.evento.longitudine = loc.longitude;
      this.pin = new Microsoft.Maps.Pushpin(loc, {
        title: 'evento',
        text: 'evento',
        color: 'red'
      });
      this.map.entities.clear();
      this.map.entities.push(this.pin);
    }
  }

  onSubmit = () => { 
    
    var sm = new Microsoft.Maps.Search.SearchManager(this.map);
    /*var requestOptions = {
      where: this.evento.indirizzo,
      callback: this.submitCallback
    }
    sm.geocode(requestOptions);*/
    
    /*this.callLocalization().subscribe(
      data => { 
        this.evento.latitudine = data.point.coordinates[0],
        this.evento.longitudine = data.point.coordinates[1]
      },
      () => this.eventiService.addEvento(this.evento)
    );*/
    /*this.callLocalization().subscribe(
      data => console.log(data)
    );*/
    this.submitted = true;
  }

  submitCallback = (answer : Microsoft.Maps.Search.IGeocodeResult, userData : any) : void => {
    console.log(answer);
  }

  callLocalization() : Observable<any>{
    var comune = this.userService.utente.comune;
    var request = 'https://dev.virtualearth.net/REST/v1/Locations/?maxResults=1&countryRegion=IT&locality=' 
                  + comune + '&addressLine='
                  + encodeURIComponent(this.evento.indirizzo) + 'key='
                  + this.BingMapsAPIKey;
    console.log(request);
    //var sanitized = this.sanitizer.sanitize(4, request);
    //console.log(sanitized);
    /*angular.module('FrontEnd-Angular', []).config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        self,
        'https://dev.virtualearth.net/REST/v1/Locations/**'
      ]);
    });*/
    return this.http.get(request, this.httpOptions);
  }

}
