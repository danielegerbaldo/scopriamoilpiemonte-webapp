import { Component, Input } from '@angular/core';

import {StatoLogin, Ruolo} from "../models/enums.model";
import {Utente} from "../models/data.model";

// Test statico
import * as utenteSindaco from '../jsonTest/sindaco.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scopriamo il Piemonte';
  StatoLogin = StatoLogin;
  statoLogin = StatoLogin.ospite;
  utente: Utente = {"nome": "", "ruolo":Ruolo.base, "comune": ""};

  constructor(){
    // Carico i dati statici dal mio json
    var tmp = (utenteSindaco as any).default;
    this.utente.comune = tmp.comune;
    this.utente.nome = tmp.nome;
    this.utente.ruolo = Ruolo[tmp.ruolo as keyof typeof Ruolo];
  }

  ngOnInit(){
    console.log(this.utente);
  }

  modificaStatoLogin(s: StatoLogin){
    this.statoLogin = s;
  }
}
