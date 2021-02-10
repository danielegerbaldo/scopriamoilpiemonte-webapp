import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Ruolo } from "../../models/enums.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() ruoloUtente: Ruolo;
  elementi: String[];
  elementi_ospite = ["eventi", "mappa"]
  elementi_base = ["iscrizioni"];
  elementi_sindaco = ["iscrizioni", "crea evento", "crea sondaggio", "da confermare"];
  elementi_collaboratore = ["iscrizioni", "crea evento", "crea sondaggio"];

  constructor() {}

  ngOnInit(): void {
    this.setElementi();
  }

  ngOnChanges(){
    this.setElementi();
  }

  private setElementi(){
    this.elementi = this.elementi_ospite;
    if(this.ruoloUtente === Ruolo.base){
      this.elementi = this.elementi.concat(this.elementi_base);
    }
    if(this.ruoloUtente === Ruolo.collaboratore){
      this.elementi = this.elementi.concat(this.elementi_collaboratore);
    }
    else if(this.ruoloUtente === Ruolo.sindaco){
      this.elementi = this.elementi.concat(this.elementi_sindaco);
    }
  }
}
