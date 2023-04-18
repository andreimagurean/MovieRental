import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { IMovie, IUser } from '../shared/models';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  emptyGuid: string = '00000000-0000-0000-0000-000000000000';
  filteredMovies: IMovie[] = [];
  movies: IMovie[] = [];
  pageTitle = 'Movie List';
  sub!: Subscription;
  displayedColumns: string[] = ['id', 'name', 'genre', 'year', 'rating'];
  activeUser?: IUser;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMovies = this.performFilter(value);
  }

  constructor(private movieService: MovieService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadMovies();
    const username = localStorage.getItem("userName");
    if (username) {
      this.userService.getUser(username).subscribe(user => {
        this.activeUser = user;
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IMovie[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.movies.filter((movie: IMovie) =>
      movie.name?.toLocaleLowerCase().includes(filterBy)
    );
  }

  loadMovies() {
    this.sub = this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filteredMovies = this.movies;
      },
    });
  }

  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).subscribe(() => {
      if (this.sub) this.sub.unsubscribe();
      this.loadMovies();
    });
  }

  rentMovie(movieId: string) {
    const updatedMovie = this.movies.find(x => x.id === movieId);
    if (updatedMovie?.stock) {
      if (this.activeUser?.movieId?.includes(updatedMovie.id)) {
        updatedMovie.stock += 1;
        const movieIds = this.activeUser?.movieId?.filter(x => x !== updatedMovie.id);
        this.activeUser.movieId = movieIds;
        this.userService.updateUser(this.activeUser!).subscribe();
        this.movieService.updateMovie(updatedMovie).subscribe();
      }
      else {
        updatedMovie.stock -= 1;
        if (this.activeUser?.movieId == null) this.activeUser!.movieId = [movieId];
        else this.activeUser?.movieId?.push(movieId);
        this.userService.updateUser(this.activeUser!).subscribe();
        this.movieService.updateMovie(updatedMovie).subscribe();
      }
    }
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Movie List: ' + message;
  }
}
