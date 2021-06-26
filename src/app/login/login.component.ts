import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Ruolo, StatoLogin, Pagina } from "../../models/enums.model"
import { Utente } from "../../models/data.model";
import { UserService } from "../../services/user.service"
import { TokenStorageService } from "../../services/token-storage.service"
import { noop } from 'angular';

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
  error_message = "";
  sending = false;

  constructor(private userService: UserService, private tokenService : TokenStorageService) { }

  ngOnInit(): void {
  }

  registrati(){
    this.userService.setStatoLogin(StatoLogin.registrazione);
  }

  accedi() {
    if(!this.sending){
      this.sending = true;
      this.userService.login(this.email, this.password).subscribe(
        data => {
          this.utenteSconosciuto = false;
          this.tokenService.setToken(data.accessToken);
          this.updateUtente(data.id);
        },
        err => {
          this.utenteSconosciuto = true;
          this.sending = false;
          this.error_message = "email o password errati"
        }
      );
    }
  }

  updateUtente = (id : number) => {
    this.userService.downloadInfoUtente(id).subscribe(
      utente => {
        var ruolo = this.assignRuolo(utente.ruoli);
        var u: Utente = {
          "nome": utente.nome,
          "cognome": utente.cognome,
          "ruolo": ruolo,
          "comune": "",
          "comuneID": utente.dipendenteDiComune,
          "userID": id
        }
        this.userService.setUtente(u);
        this.userService.setStatoLogin(StatoLogin.effettuato);
        this.pageEmitter.emit(Pagina.eventi);
        console.log("login OK")
      },
      err => this.sending = false
    );
  }

  assignRuolo(ruoliArr){
    var ruolo = Ruolo.base;
    if(ruoliArr.includes("ROLE_ADMIN")){
      ruolo = Ruolo.sindaco;
    }
    return ruolo;
  }

}
