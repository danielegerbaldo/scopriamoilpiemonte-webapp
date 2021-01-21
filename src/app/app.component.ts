import { Component, Input } from '@angular/core';

import {StatoLogin} from "../models/enums.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scopriamo il Piemonte';
  StatoLogin = StatoLogin;
  statoLogin = StatoLogin.effettuato;
  //con @input dichiaro che questa variabile può essere modificata da una variabile esterna
  @Input() pagina: string = 'login';

  getPagina(event){
    this.pagina = event;
  }

  modificaStatoLogin(s: StatoLogin){
    this.statoLogin = s;
  }
}
