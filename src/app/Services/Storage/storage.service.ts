import { Injectable } from '@angular/core';

const TOKEN_KEY = 'wo_access_token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
