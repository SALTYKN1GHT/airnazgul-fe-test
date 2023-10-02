import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public viewSwitch: 'user' | 'admin' = 'user';

  switchButton() {
    if (this.viewSwitch === 'user') {
      this.viewSwitch = 'admin';
    } else {
      this.viewSwitch = 'user';
    }
  }
}
