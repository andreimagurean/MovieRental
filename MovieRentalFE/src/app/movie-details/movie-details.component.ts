import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie, IReview, ReviewSort } from '../shared/models';
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
  newMovoie: boolean = false;
  reviewSort: ReviewSort = 0;
  movieForm = new FormGroup({
    name: new FormControl(),
    genre: new FormControl(),
    year: new FormControl(),
    stock: new FormControl()
  });
  reviewForm = new FormGroup({
    review: new FormControl(),
    rating: new FormControl()
  });
  maxYear = new Date().getFullYear();


  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.id === "newMovie" ? this.newMovoie = true : this.newMovoie = false;
    if (!this.newMovoie) {
      this.getMovie(this.id);
    }
  }

  getMovie(id: string): void {
    this.movieService.getMovieById(id, this.reviewSort).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.movieForm = this.fb.group({
          name: new FormControl(this.movie?.name),
          genre: new FormControl(this.movie?.genre),
          year: new FormControl(this.movie?.year, [Validators.min(1888), Validators.max(2050)]),
          stock: new FormControl(this.movie?.stock, [Validators.min(0)]),
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
      stock: this.movieForm.value.stock,
    };
    if (this.movieForm.valid) {
      if (this.newMovoie) {
        movie.id = "00000000-0000-0000-0000-000000000000";
        this.movieService.addMovie(movie).subscribe();
        this.router.navigate(['/movies']);
      } else {
        this.movieService.updateMovie(movie).subscribe();
        this.router.navigate(['/movies']);
      }
    }
    else { console.log(this.movieForm.controls['year'].errors) }
  }

  onBack(): void {
    this.router.navigate(['/movies']);
  }

  onSubmitReview(): void {
    const review = <IReview>{
      username: localStorage.getItem("userName"),
      description: this.reviewForm.value.review,
      datetime: new Date(),
      rating: this.reviewForm.value.rating,
    }
    if (this.movie?.reviews == null) this.movie!.reviews = [review];
    else this.movie?.reviews?.push(review);
    this.movieService.updateMovie(this.movie!).subscribe();
    this.reviewForm.reset();
  }

  onSelected(value: string): void {
    this.reviewSort = Number(value);
    this.getMovie(this.id);
  }
}
