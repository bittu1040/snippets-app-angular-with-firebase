import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getImage():Observable<Image[]>{
    return this.http.get<Image[]>("https://picsum.photos/v2/list").pipe(
      catchError(this.handleError)
    )
  }


  // simulate client side and server side error (TODO)


  private handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage)
  }
}
