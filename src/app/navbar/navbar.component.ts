import { Component, Input, OnInit, OnChanges } from '@angular/core';

import {Ruolo} from "../../models/enums.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() ruoloUtente: Ruolo;
  elementi: String[];
  elementi_base = ["iscrizioni", "mappa"];
  elementi_sindaco = ["crea evento", "crea sondaggio"];
  elementi_collaboratore = ["crea evento", "crea sondaggio"];

  constructor() { }

  ngOnInit(): void {
    this.setElementi();
  }

  ngOnChanges(){
    this.setElementi();
  }

  private setElementi(){
    this.elementi = this.elementi_base;
    if(this.ruoloUtente === Ruolo.collaboratore){
      this.elementi.concat(this.elementi_collaboratore);
    }
    else if(this.ruoloUtente === Ruolo.sindaco){
      this.elementi = this.elementi.concat(this.elementi_sindaco);
    }
  }
}
