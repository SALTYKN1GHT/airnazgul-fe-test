import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private cartItems: any;
  public itemNo: number = 1;
  orderDetails: any[] = [];
  passDetails: any[] = [
    {
      imagePath: '',
      realm: 'Gondor',
      settlements: ['Minas Tirith', 'Linhir', 'Argonath', 'Dol Amroth'],
      price: 500,
    },
    {
      imagePath: '',
      realm: 'Rhovanion',
      settlements: ['Dol Guldur', 'Calas Galadhon'],
      price: 500,
    },
  ];

  totalPrice: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchOrderDetails();

    this.calculateTotalPrice();

    for (let orderDetail of this.orderDetails) {
      orderDetail.imagePathDeparture = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
        orderDetail.departure.settlement
      )}.png`;
      orderDetail.imagePathArrival = `assets/images/dest_profile_pics/${this.convertToUnderscoreFormat(
        orderDetail.arrival.settlement
      )}.png`;
    }

    for (let passDetail of this.passDetails) {
      passDetail.imagePath = `assets/images/pass_cards/${passDetail.realm.toLowerCase()}.png`;
    }
  }

  convertToUnderscoreFormat(text: string) {
    console.log(text);
    const result = text.toLowerCase().replace(/\s+/g, '-');
    console.log(result);

    return result;
  }

  fetchOrderDetails() {
    /*
    orderDetails: any[] = [
    {
      departure: { dest_code: 'EDO', settlement: 'Edoras', realm: 'Rohan', imagePath: '' },
      arrival: { dest_code: 'LHR', settlement: 'Linhir', realm: 'Gondor' },
      departureTime: '13.00',
      arrivalTime: '15.50',
      date: '2023.09.12',
      distance: 987,
      flightTime: '2hrs 50mins',
      price: 123,
      imagePathDeparture: '',
      imagePathArrival: '',
    },
    */
    const storageItems = localStorage.getItem('cart');
    if (storageItems !== null) {
      this.cartItems = JSON.parse(storageItems);
      console.log(this.cartItems);

      const items = Object.values(this.cartItems);
      items.forEach((item: any) => {
        this.orderDetails.push({
          departure: item.from,
          arrival: item.to,
          departureTime: item.departureHour,
          arrivalTime: item.arrivalHour,
          date: item.departureDate,
          distance: item.distance,
          flightTime: item.flightTime,
          price: item.price,
          origprice: item.price,
          seats: 1,
          imagePathDeparture: '',
          imagePathArrival: '',
        });
      });
    }
  }

  increaseQuantity(orderDetails: any) {
    orderDetails.seats++;
    orderDetails.price = +(orderDetails.origprice * orderDetails.seats).toFixed(0);
    console.log(orderDetails.price);
    this.calculateTotalPrice();
  }

  decreaseQuantity(orderDetails: any) {
    orderDetails.seats--;
    orderDetails.price = +(orderDetails.origprice * orderDetails.seats).toFixed(0);
    this.calculateTotalPrice();
  }

  deleteOrder(orderDetails: any) {
    const deletedKey = `${orderDetails.departure.settlement}-${orderDetails.arrival.settlement}`;

    delete this.cartItems[deletedKey];
    localStorage.setItem('cart', JSON.stringify(this.cartItems));

    location.reload();
  }

  submitOrder() {}

  calculateTotalPrice() {
    this.totalPrice = this.orderDetails.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);
  }
}
