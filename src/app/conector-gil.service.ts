import { Injectable } from '@angular/core';
import { Socio } from './Socio/Socio';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConectorGilService {

  private apiURL = 'http://192.168.1.13:3000/ConsultaLabCore';

  constructor(private http:HttpClient) {}

  getSocios(query:String): Observable<Socio[]>{
    const url = `${this.apiURL}/?consulta=${query}`;
    return this.http.get<Socio[]>(url).pipe(
      catchError(this.handleError('getAllData',[]))
    );

    
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
