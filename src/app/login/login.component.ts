import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StatoLogin, Pagina } from "../../models/enums.model";
import { Utente } from "../../models/data.model";
import { UserService } from "../../services/user.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private userService: UserService,
    private tokenService : TokenStorageService,
    private cookieService: CookieService
    ) { }

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
          console.log("accedi ok");
        },
        error => {  // gets ignored for some reason
          this.utenteSconosciuto = true;
          this.sending = false;
          this.error_message = "email o password errati"
          console.log("accedi ko");
        }
      );
    }
  }

  updateUtente = (id : number) => {
    this.userService.downloadInfoUtente(id).subscribe(
      utente => {
        console.log(utente);
        var ruolo = this.userService.assignRuolo(utente.ruoli);
        var u: Utente = {
          "nome": utente.nome,
          "cognome": utente.cognome,
          "ruolo": ruolo,
          "comuneResidenzaID": utente.comuneResidenza?.istat,
          "comuneDipendenteID": utente.dipendenteDiComune?.istat,
          "userID": id
        }
        this.userService.setUtente(u);
        this.userService.setStatoLogin(StatoLogin.effettuato);
        console.log("login OK");
        sessionStorage.setItem('token', this.tokenService.getToken());
        sessionStorage.setItem('user', JSON.stringify(u));
        this.pageEmitter.emit(Pagina.eventi);
      },
      error => this.sending = false
    );
  }

  googleLogin(){
    const url = 'http://localhost/oauth2/authorization/google';
    var windowHandle = this.createWindow(url, "Login");
    var loopCount = 10000;
    var intervalLength = 100;
    var intervalId = setInterval(
      () => {
        if (loopCount-- < 0) {
          clearInterval(intervalId);
          windowHandle.close();
        }
        var cookieName = 'GoogleLogin';
        if(this.cookieService.check(cookieName)){
          var cookie = this.cookieService.get(cookieName);
          console.log("Cookie found");
          this.cookieService.delete(cookieName);
          this.utenteSconosciuto = false;
          clearInterval(intervalId);
          windowHandle.close();
          this.userService.validateToken(cookie).subscribe(
            data => {
              this.utenteSconosciuto = false;
              this.tokenService.setToken(cookie);
              this.updateUtente(data.id);
            }
          );
        }
      },
      intervalLength
    );
  }

  createWindow(url: string, name: string = 'Window', width: number = 500, height: number = 600, left: number = 0, top: number = 0) {
    if (url == null) {
        return null;
    }
    var options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  }
}
