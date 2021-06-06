import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Utente } from '../models/data.model'
import {StatoLogin, Ruolo} from "../models/enums.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  utente: Utente = {
    "nome": "Ospite",
    "ruolo": Ruolo.ospite,
    "comune": "",
    "comuneID": -1,
    "userID": -1
  }

  statoLogin: StatoLogin = StatoLogin.ospite;

  utenteChange: Subject<Utente> = new Subject<Utente>();
  statoLoginChange: Subject<StatoLogin> = new Subject<StatoLogin>();

  constructor() { 
    this.utenteChange.subscribe((u) => this.utente = u);
    this.statoLoginChange.subscribe((s) => this.statoLogin = s);
  }

  getUtente(): Observable<Utente>{
    return of(this.utente);
  }

  getStatoLogin(): Observable<StatoLogin>{
    return of(this.statoLogin);
  }

  setUtente(u: Utente){
    this.utenteChange.next(u);
  }

  setStatoLogin(s: StatoLogin){
    this.statoLoginChange.next(s);
  }
}
