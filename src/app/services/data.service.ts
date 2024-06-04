import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getImage():Observable<Image[]>{
    return this.http.get<Image[]>("https://picsum.photos/v2/list").pipe( 
      map(images => images.slice(0, 10)),
      catchError(this.handleError)
    )
  }


  // simulate client side and server side error (TODO)


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = {
      message: 'Unknown error!',
      status: error.status,
      statusText: error.statusText
    };
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage.message = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status === 0) {
        errorMessage.message = `Network error: Unable to reach the server. Please check your internet connection or try again later.`;
      } else {
        errorMessage.message = `Error Code: ${error.status} - Message: ${error.message}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
