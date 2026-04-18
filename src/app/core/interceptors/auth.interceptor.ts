import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Services/Storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storage.getToken();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.storage.removeToken();
          this.router.navigate(['/wo/login']);
        }
        return throwError(() => err);
      }),
    );
  }
}
