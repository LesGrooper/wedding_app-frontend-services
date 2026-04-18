import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'src/app/Services/Storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.storage.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/wo/login']);
    return false;
  }
}
