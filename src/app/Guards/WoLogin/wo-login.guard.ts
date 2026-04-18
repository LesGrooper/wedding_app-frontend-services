import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'src/app/Services/Storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class WoLoginGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.storage.isAuthenticated()) {
      this.router.navigate(['/wo/dashboard']);
      return false;
    }
    return true;
  }
}
