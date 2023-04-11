import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../shared/models';

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

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredMovies = this.performFilter(value);
  }

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
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

  onRatingClicked(message: string): void {
    this.pageTitle = 'Movie List: ' + message;
  }
}
