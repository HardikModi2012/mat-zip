import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailFormControl: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.min(8),
      ]),
    });
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      return;
    }

    let formValue = this.loginForm.value;

    if (!formValue) {
      return;
    }
    let userName = this.cookieService.get('username');
    let getPassword = this.cookieService.get('token');

    if (
      userName === formValue.emailFormControl &&
      getPassword === formValue.passwordFormControl
    ) {
      this.router.navigate(['/welcome']);
      return true;
    } else if (!userName && !getPassword) {
      alert('no credentials found!!!');
      return false;
    } else {
      alert('Invalid credentials!!!');
      return false;
    }
  }
}
