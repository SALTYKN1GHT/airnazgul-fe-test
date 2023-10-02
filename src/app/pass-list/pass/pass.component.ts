import { Component, Input } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Destination } from 'src/interfaces/destination';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent {
  faShoppingCart = faShoppingCart;

  @Input() realm: string | undefined = '';
  @Input() settlements: string[] = [];
  public profileImgPath: string = '';
  public coverImgPath: string = '';
  public price = Math.floor(Math.random() * 1000 + 1);

  ngOnInit() {
    this.coverImgPath = `assets/images/pass_cards/${this.realm?.toLowerCase()}.png`;
    this.profileImgPath = `assets/images/dest_profile_pics/aldburg.png`;
  }
}
