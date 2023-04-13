import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  isUserLoggedIn: boolean = false;
  constructor() { }

  login(userName: string, password: string) {
    if (userName && password) {
      this.isUserLoggedIn = true;
      localStorage.setItem('userName', userName);
      localStorage.setItem('password', password);
    }
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? 'true' : 'false');

    return of(this.isUserLoggedIn);
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.clear();
  }
}
