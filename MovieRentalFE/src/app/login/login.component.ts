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
  loginForm = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private authService: AuthGuardService,
    private router: Router
  ) {}

  onSignUp() {
    this.isLogin = !this.isLogin;
    this.loginForm.controls.email.setValidators(
      this.isLogin ? [Validators.required] : null
    );
    this.loginForm.controls.email.updateValueAndValidity();
  }

  onSubmit() {
    const newUser: IUser = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      email: this.loginForm.value.email,
    };

    if (this.loginForm.valid) {
      this.userService.loginUser(newUser).subscribe((x) => {
        this.authService.login(x.username, x.password).subscribe((data) => {
          if (data) this.router.navigate(['/movies']);
        });
      });
      this.loginForm.reset();
    }
  }
}
