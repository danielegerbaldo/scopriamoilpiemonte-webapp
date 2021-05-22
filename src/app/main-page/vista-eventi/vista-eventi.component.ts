import { Component, OnInit, HostListener } from '@angular/core';
import { Evento } from '../../../models/data.model';
import { Observable } from 'rxjs';
import { EventiService } from "../../../services/eventi.service";
import {FilterService } from "../../../services/filter.service";
import { FiltriEventi } from '../../../models/data.model'

// test
//import * as templateEvento from '../../../jsonTest/evento.json';

@Component({
  selector: 'app-vista-eventi',
  templateUrl: './vista-eventi.component.html',
  styleUrls: ['./vista-eventi.component.css']
})
export class VistaEventiComponent implements OnInit {

  listaEventi$: Observable<Evento[]>;
  windowScrolled: boolean;
  filtri: FiltriEventi;

  constructor(private eventiService : EventiService, private filterService : FilterService) {
  }

  ngOnInit(): void {
    this.getFiltri();
    this.getEventi();
  }

  getEventi(){
    this.listaEventi$ = this.eventiService.getEventi();
  }

  getFiltri(){
    this.filtri = this.filterService.getFiltri();
  }

  isFiltered(evento : Evento) : boolean{
    var ret = false;
    if(evento){
      if(this.applyAvailabilityFilter(evento) ||
        this.applyMinDateFilter(evento) ||
        this.applyMaxDateFilter(evento) ||
        this.applyPricefilter(evento)){
        ret = true;
      }
    }
    return ret;
  }

  applyAvailabilityFilter(evento : Evento) : boolean{
    var ret = false;
    if(this.postiRimanenti(evento) < 1 && this.filtri.nascondiPieni){
      ret = true;
    }
    return ret;
  }

  applyMinDateFilter(evento : Evento) : boolean{
    var ret = false;
    if(this.filtri.dataMin > new Date(evento.data)){
      ret = true;
    }
    return ret;
  }

  applyMaxDateFilter(evento : Evento) : boolean{
    var ret = false;
    if(this.filtri.dataMax < new Date(evento.data)){
      ret = true;
    }
    return ret;
  }

  applyPricefilter(evento : Evento){
    var ret = false;
    if(this.filtri.prezzoMax < evento.prezzo ||
      this.filtri.prezzoMin > evento.prezzo){
        ret = true;
      }
    return ret;
  }

  postiRimanenti(evento : Evento) : number{
    return evento.numMaxPartecipanti - evento.partecipanti;
  }

  // Scroll to top button

  @HostListener("window:scroll", [])

  onWindowScroll() {
      if (window.pageYOffset  > 500) {
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 500) {
          this.windowScrolled = false;
      }
  }
  
  scrollToTop() {
      (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
  }

}
