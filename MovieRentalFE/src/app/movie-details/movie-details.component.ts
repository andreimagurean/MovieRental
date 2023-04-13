import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from '../shared/models';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  movie: IMovie | undefined;
  id: string = '';
  movieForm = new FormGroup({
    name: new FormControl(),
    genre: new FormControl(),
    year: new FormControl(),
    rating: new FormControl(),
    stock: new FormControl(),
  });

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id !== '00000000-0000-0000-0000-000000000000') {
      this.getMovie(this.id);
    }
  }

  getMovie(id: string): void {
    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.movieForm = new FormGroup({
          name: new FormControl(this.movie?.name),
          genre: new FormControl(this.movie?.genre),
          year: new FormControl(this.movie?.year),
          rating: new FormControl(this.movie?.rating),
          stock: new FormControl(this.movie?.stock),
        });
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onSubmit() {
    const movie = <IMovie>{
      id: this.id,
      name: this.movieForm.value.name,
      genre: this.movieForm.value.genre,
      year: this.movieForm.value.year,
      rating: this.movieForm.value.rating,
      stock: this.movieForm.value.stock,
    };
    if (this.id === '00000000-0000-0000-0000-000000000000') {
      this.movieService.addMovie(movie).subscribe();
      this.router.navigate(['/movies']);
    } else {
      this.movieService.updateMovie(movie).subscribe();
      this.router.navigate(['/movies']);
    }
  }

  onBack(): void {
    this.router.navigate(['/movies']);
  }
}
