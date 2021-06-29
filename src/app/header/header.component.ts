import { Component, OnInit } from '@angular/core';

import {Ruolo, StatoLogin} from "../../models/enums.model"
import { Utente } from "../../models/data.model";
import { UserService } from "../../services/user.service"
import { TokenStorageService } from "../../services/token-storage.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  StatoLogin = StatoLogin;
  statoLogin: StatoLogin;
  utente: Utente;

  constructor(private userService: UserService, private tokenService : TokenStorageService) { 
    this.userService.utenteChange.subscribe(utente => this.utente = utente);
    this.userService.statoLoginChange.subscribe(statoLogin => this.statoLogin = statoLogin);
  }

  ngOnInit(): void {
    this.getUtente();
    this.getStatoLogin();
  }

  getUtente(): void{
    this.userService.getUtente().subscribe(utente => this.utente = utente);
  }

  getStatoLogin(): void{
    this.userService.getStatoLogin().subscribe(statoLogin => this.statoLogin = statoLogin);
  }

  changeLoginStatus(nuovoStato: StatoLogin){
    this.userService.setStatoLogin(nuovoStato);
  }

  logOut(){
    var u: Utente = {
      "nome": "",
      "cognome": "",
      "ruolo": Ruolo.ospite,
      "comuneResidenzaID": -1,
      "comuneDipendenteID": -1,
      "userID": -1
    }
    this.userService.setUtente(u);
    this.changeLoginStatus(StatoLogin.accesso);
    this.tokenService.clearToken();
    sessionStorage.clear();
  }

}