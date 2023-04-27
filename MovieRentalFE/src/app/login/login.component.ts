import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../guard/authGuard.service';
import { UserService } from '../services/user.service';
import { IUser } from '../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLogin: boolean = true;
  user!: IUser;
  isSubmitted: boolean | undefined;
  loginForm = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private authService: AuthGuardService,
    private router: Router
  ) { }

  onSignUp() {
    this.isLogin = !this.isLogin;
    this.loginForm.controls.email.setValidators(
      !this.isLogin ? [Validators.required, Validators.email] : null,
    );
    this.loginForm.controls.email.updateValueAndValidity();
  }

  onSubmit() {
    this.isSubmitted = true;
    const newUser: IUser = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,
    };

    if (this.loginForm.valid) {
      if (newUser.email) {
        this.userService.register(newUser).subscribe((x) => {
          this.authService.login(x.username, x.password).subscribe((data) => {
            if (data) this.router.navigate(['/movies']);
          });
        });
      }
      else {
        this.userService.login(newUser).subscribe((x) => {
          this.authService.login(x.username, x.password).subscribe((data) => {
            if (data) this.router.navigate(['/movies']);
          });
        });
      }
      this.loginForm.reset();
    }
  }
}
