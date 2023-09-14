import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  constructor(private http: HttpClient) { }


  public login(emailFormControl: string, passwordFormControl: any): any {
    this.authStatusListener.next(true);
    return this.http.get<Profile[]>('http://localhost:3000/posts');
  };

  public signup(formData: any): any {
    return this.http.post<Profile>('http://localhost:3000/posts', formData);
  };

  get() {
    return this.http.get<Profile[]>('http://localhost:3000/posts');
  }

}
