import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Ruolo, StatoLogin, Pagina } from "../../models/enums.model"
import { Utente } from "../../models/data.model";
import { UserService } from "../../services/user.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  utenteSconosciuto: boolean;
  email: string;
  password: string;
  @Output() pageEmitter = new EventEmitter<Pagina>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  registrati(){
    this.userService.setStatoLogin(StatoLogin.registrazione);
  }

  accedi(){
    if(this.email === 'sindaco' && this.password === 'sindaco'){
      this.utenteSconosciuto = false;
      var u: Utente = {
        "nome": "Di Lignano",
        "ruolo": Ruolo.sindaco,
        "comune": "Lignano",
        "comuneID": 1,
        "userID": 1
      }
      this.userService.setUtente(u);
      this.userService.setStatoLogin(StatoLogin.effettuato);
      this.pageEmitter.emit(Pagina.eventi);
    }else{
      this.utenteSconosciuto = true;
    }
  }

}
