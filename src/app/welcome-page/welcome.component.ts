import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  allProfile: Profile[] = [];
  dataSource: any = [];

  authSubscription!: Subscription;

  displayedColumns: string[] = ['address', 'firstName', 'lastName', 'email', 'date'];
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.authSubscription = this.auth.get().subscribe((data) => {
      this.allProfile = data;
      this.dataSource = this.allProfile;
    });
  }


}
