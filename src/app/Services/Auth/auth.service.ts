import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../Storage/storage.service';
import { LoginRequest, LoginResponse } from 'src/app/Models/api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
  ) {
    this._isAuthenticated.next(this.storage.isAuthenticated());
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const body = {
      username: credentials.username,
      password: credentials.password,
    };

    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, body)
      .pipe(
        tap((res) => {
          this.storage.setToken(res.access_token);
          this._isAuthenticated.next(true);
        }),
      );
  }

  logout(): void {
    this.storage.removeToken();
    this._isAuthenticated.next(false);
    this.router.navigate(['/wo/login']);
  }

  get isLoggedIn(): boolean {
    return this.storage.isAuthenticated();
  }
}
