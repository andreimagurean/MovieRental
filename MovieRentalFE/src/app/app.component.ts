import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from './guard/authGuard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MovieRental';
  isUserLoggedIn = false;

  constructor(private authService: AuthGuardService, private router: Router) {}

  ngOnInit() {
    let storeData = localStorage.getItem('isUserLoggedIn');
    if (storeData != null && storeData == 'true') this.isUserLoggedIn = true;
    else this.isUserLoggedIn = false;
  }

  onLogOut() {
    this.authService.logout();
    alert('You have been logged out');
    this.router.navigate(['/']);
  }
}