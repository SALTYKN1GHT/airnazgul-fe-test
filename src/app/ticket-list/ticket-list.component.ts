import { Component, OnInit } from '@angular/core';
import { TicketObject } from '../../interfaces/ticket';
import { ActivatedRoute } from '@angular/router';
import { SearchInput } from 'src/interfaces/search-input';
import { Destination } from 'src/interfaces/destination';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit {
  public seats: boolean = true;
  public realm: string = '';
  public departures: TicketObject[] = [];
  public returns: TicketObject[] = [];
  public destinations: Destination[] = [];
  public filteredDestinations: string[] = [];
  public depTicketOne: TicketObject | undefined;
  public departureHours: number[] = [380, 395, 435, 465, 510, 530, 555, 585, 605, 625, 670, 690, 720, 755]; // 380 = 6:20

  searchInput: SearchInput;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('destinations').subscribe(data => {
      this.destinations = data as any;
      this.route.queryParams.subscribe(params => {
        const fromLoc = this.destinations.find(item => item.settlement === params['from']);
        const toLoc = this.destinations.find(item => item.settlement === params['to']);
        const departureHourOne = this.departureHours[Math.floor(Math.random() * this.departureHours.length)];
        const departureHourTwo = this.departureHours[Math.floor(Math.random() * this.departureHours.length)];
        if (!!fromLoc && !!toLoc) {
          const distance: number = this.calcDistance(
            fromLoc.x_coordinate,
            fromLoc.y_coordinate,
            toLoc.x_coordinate,
            toLoc.y_coordinate
          );
          const flightTimeSlow: number = this.calcFlightTime(distance, 2.2);
          const flightTimeFast: number = this.calcFlightTime(distance, 2.8);

          this.depTicketOne = {
            from: fromLoc,
            to: toLoc,
            departureDate: params['departure'],
            departureHour: this.TimeToStr(departureHourOne),
            returnDate: params['arrival'],
            distance: distance,
            flightTime: this.TimeToStr(flightTimeSlow) + ' h',
            arrivalHour: this.TimeToStr(departureHourOne + flightTimeSlow),
            price: +(flightTimeSlow / 0.8).toFixed(2),
          };
          const depTicketTwo = {
            from: fromLoc,
            to: toLoc,
            departureDate: params['departure'],
            departureHour: this.TimeToStr(departureHourTwo),
            returnDate: params['arrival'],
            distance: distance,
            flightTime: this.TimeToStr(flightTimeFast) + ' h',
            arrivalHour: this.TimeToStr(departureHourTwo + flightTimeFast),
            price: +(flightTimeFast / 0.65).toFixed(2),
          };
          this.departures.push(this.depTicketOne);
          this.departures.push(depTicketTwo);

          const retTicketOne = {
            from: toLoc,
            to: fromLoc,
            departureDate: params['return'],
            departureHour: this.TimeToStr(departureHourOne),
            returnDate: params['arrival'],
            distance: distance,
            flightTime: this.TimeToStr(flightTimeSlow) + ' h',
            arrivalHour: this.TimeToStr(departureHourOne + flightTimeSlow),
            price: +(flightTimeSlow / 0.8).toFixed(2),
          };
          const retTicketTwo = {
            from: toLoc,
            to: fromLoc,
            departureDate: params['return'],
            departureHour: this.TimeToStr(departureHourTwo),
            returnDate: params['arrival'],
            distance: distance,
            flightTime: this.TimeToStr(flightTimeFast) + ' h',
            arrivalHour: this.TimeToStr(departureHourTwo + flightTimeFast),
            price: +(flightTimeFast / 0.65).toFixed(2),
          };

          if (retTicketOne.from.realm !== 'Mordor') {
            this.returns.push(retTicketOne);
            this.returns.push(retTicketTwo);
          }

          const destination = this.destinations.filter(item => item.settlement === params['from']);
          this.filteredDestinations = this.destinations
            .filter(item => item.realm === destination[0].realm)
            .map(item => item.dest_code);
          this.realm = this.destinations.filter(item => item.realm === destination[0].realm)[0].realm;
          console.log(fromLoc.realm);
        }
      });
    });
  }
  calcDistance(fromX: number, fromY: number, toX: number, toY: number): number {
    const deltaX = fromX - toX;
    const deltaY = fromY - toY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2).toFixed(2);
    return +distance;
  }
  calcFlightTime(distance: number, speed: number): number {
    const flightTime = (distance / speed).toFixed(0);
    return +flightTime;
  }
  TimeToStr(flightTime: number): string {
    const hour: number = Math.floor(flightTime / 60);
    const hourStr: string = hour.toString().padStart(2, '0');
    const mins: number = +(flightTime % 60).toFixed(1);
    const minStr: string = mins.toString().padStart(2, '0');
    return `${hourStr}:${minStr}`;
  }
  calcArrivalHour(departureHour: string): string {
    return '';
  }
  calcPrice(): number {
    return 0;
  }
}
