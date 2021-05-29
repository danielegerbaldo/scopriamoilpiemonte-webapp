import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Ruolo, Pagina } from "../../models/enums.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() ruoloUtente: Ruolo;
  elementi: String[];
  elementi_ospite = ["eventi", "mappa"]
  elementi_sindaco = ["crea evento", "crea sondaggio", "da confermare"];
  elementi_collaboratore = ["crea evento", "crea sondaggio"];
  @Output() pageEmitter = new EventEmitter<Pagina>();

  constructor() {}

  ngOnInit(): void {
    this.setElementi();
  }

  ngOnChanges(){
    this.setElementi();
  }

  private setElementi(){
    this.elementi = this.elementi_ospite;
    /*if(this.ruoloUtente === Ruolo.base){
      nothing more than guest
    }*/
    if(this.ruoloUtente === Ruolo.collaboratore){
      this.elementi = this.elementi.concat(this.elementi_collaboratore);
    }
    else if(this.ruoloUtente === Ruolo.sindaco){
      this.elementi = this.elementi.concat(this.elementi_sindaco);
    }
  }

  cambiaPagina(p: String){
    p = p.replace(/\s+/g, '');
    var pg: Pagina = Pagina[p as keyof typeof Pagina];
    this.pageEmitter.emit(pg);
  }
}
