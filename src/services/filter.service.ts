import { Injectable } from '@angular/core';
import { FiltriEventi } from '../models/data.model'

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filtri: FiltriEventi = {
    "distanza": 50,
    "nascondiPieni": false,
    "prezzoMin": 0,
    "prezzoMax": 500,
    "dataMin": new Date(),
    "dataMax": null,
    "iscrizioni": false,
    "noIscrizioni": false
  };

  constructor() {}

  getFiltri(){
    return this.filtri;
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);
  
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }
}
