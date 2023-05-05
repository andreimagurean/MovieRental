import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    var authToken = localStorage.getItem("authToken");
    return this.http
      .get<IUser[]>('https://localhost:44314/User', { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  getUser(): Observable<IUser> {

    var authToken = localStorage.getItem("authToken");
    return this.http
      .get<IUser>(`https://localhost:44314/User/username`, { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  updateUser(user: IUser): Observable<IUser> {
    var authToken = localStorage.getItem("authToken");
    return this.http
      .put<IUser>('https://localhost:44314/User', user, { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  login(user: IUser) {
    return this.http
      .post('https://localhost:44314/User/login', user, { responseType: "text" })
      .pipe(catchError(this.handleError));
  }

  register(user: IUser): Observable<string> {
    return this.http
      .post<string>('https://localhost:44314/User/register', user)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    alert(err.error);
    return throwError(() => err.error);
  }
}
