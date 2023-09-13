import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private cookieService: CookieService, private router: Router) { }
  isAuthenticated : boolean = false;
  authListenerSubs!: Subscription;
  isLoggedIn = false;
  ngOnInit() {
  if (this.cookieService.get('username') && this.cookieService.get('token')) {
    this.isLoggedIn = true;
    this.authListenerSubs = this.auth.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated
      console.log("isLoggedIn", this.isLoggedIn);
      
    });
    this.router.navigate(['/welcome'])
  } else {
    this.isLoggedIn = false;
  }      
  }

  login(){
    this.router.navigate(['/login'])
  }

  logout(){
    this.cookieService.delete('username');
    this.cookieService.delete('token');
    window.localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

}
