import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Evento } from '../../../models/data.model';
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

  listaEventi: Evento[] = [];
  windowScrolled: boolean;
  filtri: FiltriEventi;

  constructor(@Inject(DOCUMENT) private document: Document, private eventiService : EventiService, private filterService : FilterService) {
  }

  ngOnInit(): void {
    this.getEventi();
    this.getFiltri();
  }

  getEventi(){
    this.eventiService.getEventi()
        .subscribe(eventi => this.listaEventi = eventi);
  }

  getFiltri(){
    this.filtri = this.filterService.getFiltri();
  }

  isFiltered(evento : Evento) : boolean{
    var ret = false;
    if(this.applyAvailabilityFilter(evento) ||
        this.applyMinDateFilter(evento) ||
        this.applyMaxDateFilter(evento)){
      ret = true;
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
