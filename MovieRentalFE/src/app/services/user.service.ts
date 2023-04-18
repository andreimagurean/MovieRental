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
    return this.http
      .get<IUser[]>('https://localhost:44314/User')
      .pipe(catchError(this.handleError));
  }

  getUser(username: string): Observable<IUser> {
    return this.http
      .get<IUser>(`https://localhost:44314/User/username`, { params: { username } })
      .pipe(catchError(this.handleError));
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http
      .put<IUser>('https://localhost:44314/User', user)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>('https://localhost:44314/User', user)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    alert(err.error);
    return throwError(() => err.error);
  }
}
