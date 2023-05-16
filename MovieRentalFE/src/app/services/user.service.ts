import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from '../shared/models';
import { AuthGuardService } from '../guard/authGuard.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthGuardService) { }

  getUsers(): Observable<IUser[]> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .get<IUser[]>('https://localhost:44314/User', { headers: { 'Authorization': `Bearer ${authToken}` } })
  }

  getUser(): Observable<IUser> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .get<IUser>(`https://localhost:44314/User/username`, { headers: { 'Authorization': `Bearer ${authToken}` } })
  }

  updateUser(user: IUser): Observable<IUser> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .put<IUser>('https://localhost:44314/User', user, { headers: { 'Authorization': `Bearer ${authToken}` } })
  }

  login(user: IUser) {
    return this.http
      .post('https://localhost:44314/User/login', user, { responseType: "text" })
  }

  register(user: IUser) {
    return this.http
      .post('https://localhost:44314/User/register', user, { responseType: "text" })
  }
}
