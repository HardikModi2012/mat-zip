import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  showFields: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
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

  signup() {
    this.signUpForm.markAllAsTouched();
    if (!this.signUpForm.valid) {
      return;
    }

    let formValue = this.signUpForm.value;
    // console.log('formValue', formValue);

    if (!formValue) {
      return;
    }
    window.localStorage.setItem('user', JSON.stringify(formValue));

    this.cookieService.set('username', formValue.emailFormControl as string);
    this.cookieService.set('token', formValue.passwordFormControl as string);
    this.router.navigate(['/login']);
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
