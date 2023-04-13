import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieGuardService } from './guard/movieGuard.service';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    canActivate: [MovieGuardService],
  },
  { path: 'movies', component: MovieListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie', redirectTo: 'movies', pathMatch: 'full' },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
