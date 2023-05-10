import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IMovie, ReviewSort } from '../shared/models';
import { AuthGuardService } from '../guard/authGuard.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient, private authService: AuthGuardService) { }

  getMovies(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>('https://localhost:44314/Movie')
  }

  updateMovie(movie: IMovie): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .put<IMovie>('https://localhost:44314/Movie', movie, { headers: { 'Authorization': `Bearer ${authToken}` } })
  }

  deleteMovie(id: string): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .delete<IMovie>(`https://localhost:44314/Movie/${id}`, { headers: { 'Authorization': `Bearer ${authToken}` } })
  }

  getMovieById(id: string, sort: ReviewSort): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .get<IMovie>(`https://localhost:44314/Movie/${id}?sort=${sort}`, { headers: { 'Authorization': `Bearer ${authToken}` } })
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    if (this.authService.expiredAuthToken(authToken)) {
      authToken = null;
    }
    return this.http
      .post<IMovie>('https://localhost:44314/Movie', movie, { headers: { 'Authorization': `Bearer ${authToken}` } })
  }
}
