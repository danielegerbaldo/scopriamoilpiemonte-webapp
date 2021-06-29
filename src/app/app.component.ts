import { Component, OnInit } from '@angular/core';

import { StatoLogin, Pagina } from "../models/enums.model";
import { Utente } from "../models/data.model";
import { UserService } from "../services/user.service"
import { BingMapsLoader } from '../services/map-loader.service';
import { TokenStorageService } from 'src/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Scopriamo il Piemonte';
  StatoLogin = StatoLogin;
  statoLogin: StatoLogin;
  utente: Utente;
  Pagina = Pagina;
  pagina: Pagina = Pagina.eventi;

  mapReady = false;

  constructor(private userService: UserService, private tokenService : TokenStorageService){
    this.userService.utenteChange.subscribe(utente => this.utente = utente);
    this.userService.statoLoginChange.subscribe(statoLogin => this.statoLogin = statoLogin);

    BingMapsLoader.load()
            .then(res => {
                console.log('BingMapsLoader.load.then', res);
                this.mapReady = true;
        });
  }

  ngOnInit(){
    var token = sessionStorage.getItem('token');
    var user = sessionStorage.getItem('user');
    if(token !== null && user !== null){
      this.tokenService.setToken(token);
      this.userService.setUtente(JSON.parse(sessionStorage.getItem('user')) as Utente);
      this.userService.setStatoLogin(StatoLogin.effettuato);
    }
    this.getUtente();
    this.getStatoLogin();
  }

  getUtente(): void{
    this.userService.getUtente().subscribe(utente => this.utente = utente);
  }

  getStatoLogin(): void{
    this.userService.getStatoLogin().subscribe(statoLogin => this.statoLogin = statoLogin);
  }

  riceviPagina(p: Pagina){
    this.pagina = p;
  }
}
