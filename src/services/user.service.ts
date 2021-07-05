import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Utente } from '../models/data.model'
import {StatoLogin, Ruolo} from "../models/enums.model";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  utente: Utente = {
    "nome": "Ospite",
    "cognome": "",
    "ruolo": Ruolo.ospite,
    "comuneResidenzaID": -1,
    "comuneDipendenteID": -1,
    "userID": -1
  }

  private baseUrl = "http://localhost/api/v1/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  statoLogin: StatoLogin = StatoLogin.ospite;

  utenteChange: Subject<Utente> = new Subject<Utente>();
  statoLoginChange: Subject<StatoLogin> = new Subject<StatoLogin>();

  constructor(private http: HttpClient) { 
    this.utenteChange.subscribe((u) => this.utente = u);
    this.statoLoginChange.subscribe((s) => this.statoLogin = s);
  }

  login(email: String, password: String): Observable<any>{
    return this.http.post(this.baseUrl + "login", {"email": email, "password": password}, this.httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  downloadInfoUtente(id : number){
    var url = this.baseUrl + "utente-composed/info-utente";
    url = `${url}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('info utente'))
    );
  }

  signup(
    email : String,
    password : String,
    nome : String,
    cognome : String,
    codiceFiscale : String,
    telefono : String,
    comuneResidenzaID : number,
    comuneDipendenteID : number,
    ruolo : Ruolo
  ){
    var ruoloArr = this.ruoloConverter(ruolo);
    return this.http.post(this.baseUrl + "signUp",
      {
        "email": email,
        "password": password,
        "nome": nome,
        "cognome": cognome,
        "cf": codiceFiscale,
        "telefono": telefono,
        "comuneResidenza": comuneResidenzaID,
        "dipendenteDiComune": comuneDipendenteID,
        "roles": ruoloArr
      },
      this.httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  getDipendentiComune(comune : number){
    var url = this.baseUrl + "utente/getDipendentiDiComune";
    url = `${url}/${comune}`;
    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('dipendenti comune'))
    );
  }

  changeRole(userID : number, ruolo : Ruolo){
    const ruoli = this.ruoloConverter(ruolo);
    return this.http.post(this.baseUrl + "utente/changeRole",
    {
      "id": userID,
      "ruoli": ruoli
    },
    this.httpOptions).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  ruoloConverter(ruolo : Ruolo) : String[]{
    var ret = [];
    switch(ruolo){
      case Ruolo.collaboratore:
        console.log("signup: collaboratore");
        ret.push("ROLE_PUBLISHER");
        break;
      case Ruolo.sindaco:
        console.log("signup: sindaco");
        ret.push("ROLE_MAYOR");
        ret.push("ROLE_ADMIN");
        break;
      default:
        console.log("signup: base");
        ret.push("ROLE_CLIENT");
        break;
    }
    return ret;
  }

  validateToken(token : string){
    const url = this.baseUrl + "validateToken?token=" + token;
    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('validate token'))
    );
  }

  assignRuolo(ruoliArr){
    var ruolo = Ruolo.base;
    if(ruoliArr.includes("ROLE_ADMIN") || ruoliArr.includes("ROLE_MAYOR")){
      ruolo = Ruolo.sindaco;
    }
    else if(ruoliArr.includes("ROLE_PUBLISHER")){
      ruolo = Ruolo.collaboratore;
    }
    else if(ruoliArr.includes("ROLE_CLIENT")){
      ruolo = Ruolo.base;
    }
    return ruolo;
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
