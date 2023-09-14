import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-flow';
  authListenerSubs!: Subscription;
  isLoggedIn = false;
  constructor(private auth: AuthService, private cookieService: CookieService, private router: Router) { }
  ngOnInit() {
    this.authListenerSubs = this.auth.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated
      this.router.navigate(['/welcome'])
      
    });
    if (this.cookieService.get('emailFormControl') && this.cookieService.get('passwordFormControl')) {
      this.isLoggedIn = true;
      this.router.navigate(['/welcome'])
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/login'])
    }
  }

  login() {
    this.router.navigate(['/login'])
  }

  signUp(){
    this.logout();
  }

  logout() {
    this.cookieService.delete('emailFormControl');
    this.cookieService.delete('passwordFormControl');
    window.localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
}

