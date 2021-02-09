import { Component, OnInit } from '@angular/core';
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

  constructor() {
    var tmp = (templateEvento as any).default;
    var ev = Object.assign(new Evento, tmp);
    for(var i = 0; i < 100; i++){
      this.listaEventi.push(ev);
    }
    console.log(this.listaEventi);
  }

  ngOnInit(): void {
  }

}
