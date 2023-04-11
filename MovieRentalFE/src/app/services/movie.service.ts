import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IMovie } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http
      .get<IMovie[]>('https://localhost:44314/Movie')
      .pipe(catchError(this.handleError));
  }

  updateMovie(movie: IMovie): Observable<IMovie> {
    return this.http
      .put<IMovie>('https://localhost:44314/Movie', movie)
      .pipe(catchError(this.handleError));
  }

  deleteMovie(id: string): Observable<IMovie> {
    return this.http
      .delete<IMovie>(`https://localhost:44314/Movie/${id}`)
      .pipe(catchError(this.handleError));
  }

  getMovieById(id: string): Observable<IMovie> {
    return this.http
      .get<IMovie>(`https://localhost:44314/Movie/${id}`)
      .pipe(catchError(this.handleError));
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return this.http
      .post<IMovie>('https://localhost:44314/Movie', movie)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    alert(err.error);
    return throwError(() => err.error);
  }
}
