import { Component, OnInit, HostListener } from '@angular/core';
import { Evento } from '../../../models/data.model';
import { Observable } from 'rxjs';
import { EventiService } from "../../../services/eventi.service";
import { FilterService } from "../../../services/filter.service";
import { UserService } from "../../../services/user.service";
import { FiltriEventi } from '../../../models/data.model'

@Component({
  selector: 'app-vista-eventi',
  templateUrl: './vista-eventi.component.html',
  styleUrls: ['./vista-eventi.component.css']
})
export class VistaEventiComponent implements OnInit {

  listaEventi$: Observable<Evento[]>;
  windowScrolled: boolean;
  filtri: FiltriEventi;
  userID : number;

  constructor(private eventiService : EventiService, private filterService : FilterService, private userService : UserService) {
  }

  ngOnInit(): void {
    this.getFiltri();
    this.userService.getUtente().subscribe(
      utente => {
        this.userID = utente.userID;
        this.getEventi();
      }
    );
  }

  getEventi(){
    this.listaEventi$ = this.eventiService.getEventi()
  }

  getFiltri(){
    this.filtri = this.filterService.getFiltri();
  }

  subscribe(evento : Evento, $event : MouseEvent){
    ($event.target as HTMLButtonElement).disabled = true;
    this.eventiService.subscribe(evento.id, this.userID).subscribe(
      () => console.log("Subscribed to event: " + evento.id)
    );
  }

  unsubscribe(evento : Evento, $event : MouseEvent){
    ($event.target as HTMLButtonElement).disabled = true;
    this.eventiService.unsubscribe(evento.id, this.userID).subscribe(
      () => console.log("Unsubscribed from event: " + evento.id)
    );
  }

  isMine(evento : Evento){
    return evento.proprietario === this.userID;
  }

  delete(evento : Evento, $event : MouseEvent){
    ($event.target as HTMLButtonElement).disabled = true;
    this.eventiService.delete(evento).subscribe(
      () => console.log("Deleted event: " + evento.id)
    );
  }

  isFiltered(evento : Evento) : boolean{
    var ret = false;
    if(evento){
      if(this.applyAvailabilityFilter(evento) ||
        this.applyMinDateFilter(evento) ||
        this.applyMaxDateFilter(evento) ||
        this.applyPricefilter(evento) ||
        this.applySubscribeFilter(evento) ||
        this.applyUnsubscribedFilter(evento)){
        ret = true;
      }
    }
    return ret;
  }

  subscribed(evento : Evento) : boolean{
    var ret = false;
    if(evento.iscritti.includes(this.userID)){
      ret = true;
    }
    return ret;
  }

  applySubscribeFilter(evento : Evento){
    return this.filtri.iscrizioni && !this.subscribed(evento);
  }

  applyUnsubscribedFilter(evento : Evento){
    return this.filtri.noIscrizioni && this.subscribed(evento);
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
