import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  authSub!: Subscription;
  signUpForm!: FormGroup;
  showFields: boolean = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      emailFormControl: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.min(8),
      ]),
      firstNameFormControl: new FormControl('', [Validators.required]),
      lastNameFormControl: new FormControl('', [Validators.required]),
      dateFormControl: new FormControl(''),
      AddressFormControl: new FormControl(''),
      radioOption: new FormControl(''),
    });
  }
  get f() { return this.signUpForm.controls; }
  signup() {
    this.submitted = true;
    this.signUpForm.markAllAsTouched();
    if (!this.signUpForm.valid) {
      return;
    }

    let formValue = this.signUpForm.value;

    if (!formValue) {
      return;
    }

    this.cookieService.set('emailFormControl', formValue.emailFormControl as string);
    this.cookieService.set('passwordFormControl', formValue.passwordFormControl as string);
    this.authSub = this.auth.signup(formValue).subscribe({
      next: (data: any) => {
        if (data) {
          this.router.navigate(['/login']);
        }
      },
      error: (err: any) => {
      },
      complete: () => {
      }
    });
  }

  radioButtonValue(event: any) {
    if (event === 1) {
      this.showFields = true;
      this.signUpForm.controls['dateFormControl'].setValidators([
        Validators.required,
      ]);
      this.signUpForm.controls['AddressFormControl'].setValidators([
        Validators.required,
      ]);
      this.signUpForm.controls['dateFormControl'].updateValueAndValidity();
      this.signUpForm.controls['AddressFormControl'].updateValueAndValidity();
      // this.reset();
    } else {
      this.showFields = false;
      this.signUpForm.controls['dateFormControl'].setValidators(null);
      this.signUpForm.controls['AddressFormControl'].setValidators(null);
      this.signUpForm.controls['dateFormControl'].updateValueAndValidity();
      this.signUpForm.controls['AddressFormControl'].updateValueAndValidity();
      // this.reset();
    }
  }
}
