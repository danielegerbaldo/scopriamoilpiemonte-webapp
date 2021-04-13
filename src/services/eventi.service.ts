import { Injectable } from '@angular/core';
import { Evento } from "../models/data.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventiService {

  private baseUrl = "http://localhost:8080/api/v1/evento";

  constructor(private http: HttpClient) { }

  getEventi(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Evento[]>('getEventi', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getEvento(id: number): Observable<Evento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Evento>(url).pipe(
      catchError(this.handleError<Evento>(`getEvento id=${id}`))
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
