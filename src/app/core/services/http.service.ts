import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get<T>(path: string): Observable<T> {
    return this.http
      .get<T>(`${environment.apiUrl}${path}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  post<T, R>(path: string, payload: T): Observable<R> {
    return this.http
      .post<R>(`${environment.apiUrl}${path}`, payload, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  patch<T, R>(path: string, payload: T): Observable<R> {
    return this.http
      .patch<R>(`${environment.apiUrl}${path}`, payload, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  put<T, R>(path: string, payload: T): Observable<R> {
    return this.http
      .put<R>(`${environment.apiUrl}${path}`, payload, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T> {
    return this.http
      .delete<T>(`${environment.apiUrl}${path}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.error({
      type: 'HTTP',
      url: error.url,
      statusCode: error.status,
      message: error.error.message,
      timestamp: new Date().toISOString(),
    });
    return throwError(() => {
      return `${error.error.message}`;
    });
  }
}
