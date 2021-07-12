import { Injectable } from '@angular/core';
import { Evento } from "../models/data.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventiService {

  private baseUrl = `http://93-41-149-178.ip82.fastwebnet.it:30193/api/v1/evento`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEventi(): Observable<Evento[]> {
    return this.http.get<Evento[]>("http://93-41-149-178.ip82.fastwebnet.it:30193/api/v1/public/evento-composed/getAllEvent")
      .pipe(
        catchError(this.handleError<Evento[]>('getEventi', []))
      );
  }

  getSubscribed(userID : number) : Observable<Evento[]>{
    var url = this.baseUrl + "/iscrizione-utente";
    url = `${url}/${userID}`;
    return this.http.get<Evento[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Evento[]>('getEventi', []))
      );
  }

  getEvento(id: number): Observable<Evento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Evento>(url, this.httpOptions).pipe(
      catchError(this.handleError<Evento>(`getEvento id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl, evento, this.httpOptions).pipe(
      tap((newEvento: Evento) => console.log(`added event w/ id=${newEvento.id}`)),
      catchError(this.handleError<Evento>('add event'))
    );
  }

  subscribe(eventoID : number, utenteID : number){
    const url = this.baseUrl + "/iscrivi";
    return this.http.post(url, {"evento" : eventoID, "utente": utenteID}, this.httpOptions).pipe(
      catchError(this.handleError<any>('subscribe'))
    );
  }

  unsubscribe(eventoID : number, utenteID : number){
    const url = this.baseUrl + "/disiscrivi?idUtente=" + utenteID + "&idEvento=" + eventoID;
    return this.http.post(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('unsubscribe'))
    );
  }

  delete(evento : Evento){
    var url = this.baseUrl + "/deleteById";
    url = `${url}/${evento.id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('delete'))
    );
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
