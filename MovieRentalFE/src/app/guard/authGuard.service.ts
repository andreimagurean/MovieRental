import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  isUserLoggedIn: boolean = false;
  constructor() { }

  login(token: string) {
    if (token) {
      this.isUserLoggedIn = true;
      localStorage.setItem('authToken', token);
    }

    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? 'true' : 'false');
    return of(this.isUserLoggedIn);
  }

  logout(): void {
    localStorage.clear();
  }
}
