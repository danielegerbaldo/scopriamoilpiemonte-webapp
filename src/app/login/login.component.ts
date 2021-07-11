import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StatoLogin, Pagina } from "../../models/enums.model";
import { Utente } from "../../models/data.model";
import { UserService } from "../../services/user.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MunicipalityService } from 'src/services/municipality.service';

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
  sendingGoogle = false;
  newGoogleLogin = false;
  comuni$ : Observable<any>;
  utente : Utente;
  cf : string;
  telefono : string;

  constructor(
    private userService: UserService,
    private tokenService : TokenStorageService,
    private cookieService: CookieService,
    private municipalityService : MunicipalityService
    ) { }

  ngOnInit(): void {
    this.comuni$ = this.municipalityService.getComuni();
  }

  registrati(){
    this.userService.setStatoLogin(StatoLogin.registrazione);
  }

  accedi() {
    if(!this.sending){
      this.sending = true;
      this.userService.login(this.email, this.password).subscribe(
        data => {
          try{
            this.utenteSconosciuto = false;
            this.tokenService.setToken(data.accessToken);
            this.updateUtente(data.id);
          }
          catch(e){
            this.utenteSconosciuto = true;
            this.sending = false;
            this.error_message = "email o password errati"
            console.log("accedi ko");
          }
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
        var ruolo = this.userService.assignRuolo(utente.ruoli);
        this.utente = {
          "nome": utente.nome,
          "cognome": utente.cognome,
          "ruolo": ruolo,
          "comuneResidenzaID": utente.comuneResidenza?.istat,
          "comuneDipendenteID": utente.dipendenteDiComune?.istat,
          "userID": id
        }
        if(this.utente.comuneResidenzaID && this.utente.comuneDipendenteID){
          this.finalizeLogin();
        }
        else{
          this.email = utente.email;
          this.cf = utente.cf;
          this.telefono = utente.telefono;
          this.newGoogleLogin = true;
        }
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

  finalizeFirstGoogleLogin(){
    this.userService.modificaUtente(
      this.utente.userID,
      this.email,
      this.utente.nome,
      this.utente.cognome,
      this.cf,
      this.telefono,
      this.utente.comuneResidenzaID,
      this.utente.comuneDipendenteID
    ).subscribe(
      () => this.finalizeLogin()
    );
  }

  finalizeLogin(){    
    this.userService.setUtente(this.utente);
    this.userService.setStatoLogin(StatoLogin.effettuato);
    console.log("login OK");
    sessionStorage.setItem('token', this.tokenService.getToken());
    sessionStorage.setItem('user', JSON.stringify(this.utente));
    this.pageEmitter.emit(Pagina.eventi);
  }

  createWindow(url: string, name: string = 'Window', width: number = 500, height: number = 600, left: number = 0, top: number = 0) {
    if (url == null) {
        return null;
    }
    var options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  }
}
