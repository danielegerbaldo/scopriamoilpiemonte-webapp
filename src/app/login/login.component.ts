import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Ruolo, StatoLogin, Pagina } from "../../models/enums.model"
import { Utente } from "../../models/data.model";
import { UserService } from "../../services/user.service"
import { TokenStorageService } from "../../services/token-storage.service"

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
        var ruolo = this.userService.assignRuolo(utente.ruoli);
        var u: Utente = {
          "nome": utente.nome,
          "cognome": utente.cognome,
          "ruolo": ruolo,
          "comuneResidenzaID": utente.comuneResidenza.istat,
          "comuneDipendenteID": utente.dipendenteDiComune.istat,
          "userID": id
        }
        this.userService.setUtente(u);
        this.userService.setStatoLogin(StatoLogin.effettuato);
        this.pageEmitter.emit(Pagina.eventi);
        console.log("login OK");
        sessionStorage.setItem('token', this.tokenService.getToken());
        sessionStorage.setItem('user', JSON.stringify(u));
      },
      err => this.sending = false
    );
  }

}
