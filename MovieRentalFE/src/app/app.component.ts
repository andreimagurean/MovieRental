import { Component, DoCheck, OnInit } from '@angular/core';
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
    if (this.authService.expiredAuthToken(token) == true) {
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
  }
}
