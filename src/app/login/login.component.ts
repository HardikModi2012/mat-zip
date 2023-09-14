import { Component, OnInit } from '@angular/core';
import {
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  profile: any;
  authListenerSubs!: Subscription;
  authSubscription!: Subscription
  isLoggedIn = false;
  ngOnDestroy(): void {
    this.authListenerSubs?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }
  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    let email = this.cookieService.get('emailFormControl');
    let password = this.cookieService.get('passwordFormControl');
    this.authListenerSubs = this.auth.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoggedIn = isAuthenticated
      });
    if (email !== "" && password !== "") {
      this.router.navigate(['/welcome']);
      this.isLoggedIn = true;
    }
    this.get();
  }
  get() {
    this.authSubscription = this.auth.get().subscribe((data) => {
      this.profile = data;
    });
  }
  login(f: NgForm) {
    if (f.invalid) {
      return;
    }

    let formValue = f.value;

    if (!formValue) {
      return;
    }
    // here I have taken statically first object.We can use filter for searching in array.
    if (this.profile[0]?.emailFormControl === formValue.emailFormControl && this.profile[0]?.passwordFormControl === formValue.passwordFormControl) {
      // this.router.navigate(['/welcome']);

      this.cookieService.set('emailFormControl', formValue.emailFormControl as string);
      this.cookieService.set('passwordFormControl', formValue.passwordFormControl as string);
      this.authSubscription = this.auth.login(formValue.emailFormControl, formValue.passwordFormControl).subscribe({
        next: (data: any) => {
          if (data) {
            this.router.navigate(['/welcome']);
          } else {
            alert({
              message: 'Email or Password is incorrect',
            });
          }
        },
        error: (err: any) => {
        },
      });
      return true;
    } else if (!this.profile?.emailFormControl && !this.profile?.passwordFormControl) {
      alert('no credentials found!!!')
      return false;
    }
    else {
      alert('Invalid credentials!!!')
      return false;
    }
  }
}
