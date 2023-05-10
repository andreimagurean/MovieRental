import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  isUserLoggedIn: boolean = false;
  constructor(private router: Router) { }

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
    this.router.navigate(['/login']);
  }

  expiredAuthToken(token: string | null) {
    if (!token) {
      this.logout();
      return true;
    }
    const expiry = (JSON.parse(Buffer.from(token!.split('.')[1], 'base64').toString())).exp;
    console.log(expiry);
    if ((Math.floor((new Date).getTime() / 1000)) >= expiry) {
      this.logout();
      return true;
    };
    return false;
  }
}
