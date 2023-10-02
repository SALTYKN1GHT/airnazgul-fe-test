import { Component, Input } from '@angular/core';
import { TicketObject } from '../../../interfaces/ticket';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() public inputTicket: TicketObject | undefined;
  faShoppingCart = faShoppingCart;
  imagePathDeparture: string = '';
  imagePathArrival: string = '';

  ngOnInit() {
    this.imagePathDeparture = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
      this.inputTicket?.from?.settlement || ''
    )}.png`;
    this.imagePathArrival = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
      this.inputTicket?.to?.settlement || ''
    )}.png`;
  }

  convertToUnderscoreFormat(text: string) {
    const result = text?.toLowerCase().replace(/\s+/g, '-');
    return result;
  }
  addToCart() {
    const cart = window.localStorage.getItem('cart');
    if (!!cart) {
      window.localStorage.setItem(
        'cart',
        JSON.stringify({
          ...JSON.parse(cart),
          [this.inputTicket?.from.settlement + '-' + this.inputTicket?.to.settlement]: this.inputTicket,
        })
      );
    } else {
      window.localStorage.setItem(
        'cart',
        JSON.stringify({
          [this.inputTicket?.from.settlement + '-' + this.inputTicket?.to.settlement]: this.inputTicket,
        })
      );
    }
  }
}
