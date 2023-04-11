import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthGuardService } from '../guard/authGuard.service';

@Injectable({
  providedIn: 'root',
})
export class MovieGuardService {
  constructor(private authService: AuthGuardService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    const val = localStorage.getItem('isUserLoggedIn');

    if (val != null && val == 'true') {
      if (url == '/login') this.router.parseUrl('/movies');
      else return true;
    } else {
      return this.router.parseUrl('/login');
    }
    return true;
  }
}
