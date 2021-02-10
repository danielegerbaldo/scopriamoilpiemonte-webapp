import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Evento } from '../../../models/data.model';

// test
import * as templateEvento from '../../../jsonTest/evento.json';

@Component({
  selector: 'app-vista-eventi',
  templateUrl: './vista-eventi.component.html',
  styleUrls: ['./vista-eventi.component.css']
})
export class VistaEventiComponent implements OnInit {

  listaEventi: Evento[] = [];
  windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) {
    var tmp = (templateEvento as any).default;
    var ev = Object.assign(new Evento, tmp);
    for(var i = 0; i < 100; i++){
      this.listaEventi.push(ev);
    }
  }

  ngOnInit(): void {
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
