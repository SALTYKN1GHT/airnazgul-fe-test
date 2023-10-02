import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  email: string = '';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.httpService.get('user/profile')
      .subscribe((data: any) => {
        this.username = data.userName;
        this.email = data.email;
      });
  }
}
