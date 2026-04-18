import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {

  private readonly REQUEST_TIMEOUT = 30000;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: Record<string, string>): Observable<T> {
    return this.http
      .get<T>(`${environment.apiUrl}${endpoint}`, { params })
      .pipe(
        timeout(this.REQUEST_TIMEOUT),
        catchError(this.handleError),
      );
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http
      .post<T>(`${environment.apiUrl}${endpoint}`, body)
      .pipe(
        timeout(this.REQUEST_TIMEOUT),
        catchError(this.handleError),
      );
  }

  private handleError(err: any): Observable<never> {
    return throwError(() => err);
  }
}
