import {Component, OnInit } from '@angular/core';
import { Ruolo, StatoLogin } from "../../models/enums.model"
import { UserService } from "../../services/user.service"
import { MunicipalityService } from "../../services/municipality.service"
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/services/token-storage.service';
import { Utente } from 'src/models/data.model';

@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css']
})
export class RegistratiComponent implements OnInit {

  nome: string;
  cognome: string;
  codiceFiscale: string = "";
  telefono: string = "";
  comuneResidenza: number;
  comuneDipendente: number;
  ruolo: Ruolo = Ruolo.base;
  email: string;
  pw1: string;
  pw2: string;

  ruoloEnum = Ruolo;
  comuni$ : Observable<any>;
  submitting = false;
  failedSubmit = false;


  constructor(private userService: UserService, private municipalityService : MunicipalityService, private tokenService : TokenStorageService) {}

  ngOnInit(): void {
    this.comuni$ = this.municipalityService.getComuni();
  }

  registrati(){
    this.submitting = true;
    this.userService.signup(
      this.email,
      this.pw1,
      this.nome,
      this.cognome,
      this.codiceFiscale,
      this.telefono,
      this.comuneResidenza,
      this.comuneDipendente,
      this.ruolo
    ).subscribe(
      response => {
        this.tokenService.setToken(response.accessToken);
        var u: Utente = {
          "nome": this.nome,
          "cognome": this.cognome,
          "ruolo": this.ruolo,
          "comuneResidenzaID": this.comuneResidenza,
          "comuneDipendenteID": this.comuneDipendente,
          "userID": response.id
        }
        console.log("signup OK");
        sessionStorage.setItem('token', response.accessToken);
        sessionStorage.setItem('user', JSON.stringify(u));
        this.userService.setUtente(u);
        this.userService.setStatoLogin(StatoLogin.effettuato);  
      },
      err => {
        this.failedSubmit = true;
        this.submitting = false;
      }
    );
  }

  passwordDiverse(){
    if(!(this.pw1 === this.pw2)){
      return true;
    }

  }

}