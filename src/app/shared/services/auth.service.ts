import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) {}

  public login(): any {
    // this.subject.next(true);
    this.authStatusListener.next(true);
  }

  public signup(formData: any): any {
    let data = formData;
    return true;
  }
}
