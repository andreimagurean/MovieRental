import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from './guard/authGuard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'MovieRental';
  isUserLoggedIn = false;

  constructor(private authService: AuthGuardService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (this.tokenExpired(token) == true) {
      this.onLogOut();
    }
    const storeData = localStorage.getItem('isUserLoggedIn');
    if (storeData != null && storeData == 'true') this.isUserLoggedIn = true;
    else this.isUserLoggedIn = false;
  }

  ngDoCheck(): void {
    if (localStorage.getItem('isUserLoggedIn') == null || false) {
      this.isUserLoggedIn = false;
    }
    else {
      this.isUserLoggedIn = true;
    }
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private tokenExpired(token: string | null) {
    if (!token) {
      return true
    }
    const expiry = (JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('base64'))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
