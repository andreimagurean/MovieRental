import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IMovie, ReviewSort } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>('https://localhost:44314/Movie')
      .pipe(catchError(this.handleError));
  }

  updateMovie(movie: IMovie): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    return this.http
      .put<IMovie>('https://localhost:44314/Movie', movie, { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  deleteMovie(id: string): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    return this.http
      .delete<IMovie>(`https://localhost:44314/Movie/${id}`, { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  getMovieById(id: string, sort: ReviewSort): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    return this.http
      .get<IMovie>(`https://localhost:44314/Movie/${id}?sort=${sort}`, { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    var authToken = localStorage.getItem("authToken");
    return this.http
      .post<IMovie>('https://localhost:44314/Movie', movie, { headers: { 'Authorization': `Bearer ${authToken}` } })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    alert(err.error);
    return throwError(() => err.error);
  }
}
