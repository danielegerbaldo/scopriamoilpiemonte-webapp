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
    "comune": "",
    "comuneID": -1,
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
    //var url = this.baseUrl + "utente-composed/info-utente";
    var url = this.baseUrl + "utente/getUser";
    url = `${url}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('info utente'))
    );
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
