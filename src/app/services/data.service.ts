import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getImage():Observable<Image[]>{
    const header= new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    });
    return this.http.get<Image[]>("https://backend-node-kappa.vercel.app/get_image_info", {headers: header}).pipe( 
      map(images => images.slice(0, 100)),
      catchError(this.handleError)
    )
  }

  // https://picsum.photos/v2/list

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
