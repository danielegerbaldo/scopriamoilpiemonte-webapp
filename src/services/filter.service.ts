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
    "iscrizioni": false 
  };

  constructor() {}

  getFiltri(){
    return this.filtri;
  }
}
