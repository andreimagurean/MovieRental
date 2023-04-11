import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  isUserLoggedIn: boolean = false;
  constructor() {}

  login(userName?: string, password?: string) {
    if (userName && password) this.isUserLoggedIn = true;
    localStorage.setItem(
      'isUserLoggedIn',
      this.isUserLoggedIn ? 'true' : 'false'
    );

    return of(this.isUserLoggedIn);
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }
}
