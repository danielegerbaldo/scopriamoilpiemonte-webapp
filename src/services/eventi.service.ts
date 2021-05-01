import { Injectable } from '@angular/core';
import { Evento } from "../models/data.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventiService {

  private baseUrl = "http://localhost/api/v1/evento";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEventi(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Evento[]>('getEventi', []))
      );
  }

  getEvento(id: number): Observable<Evento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Evento>(url).pipe(
      catchError(this.handleError<Evento>(`getEvento id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl, evento, this.httpOptions).pipe(
      tap((newEvento: Evento) => console.log(`added hero w/ id=${newEvento.id}`)),
      catchError(this.handleError<Evento>('addHero'))
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