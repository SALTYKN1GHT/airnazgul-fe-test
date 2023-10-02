import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/interfaces/destination';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.scss'],
})
export class PassListComponent implements OnInit {
  rohanDestinations: string[] = [];
  gondorDestinations: string[] = [];
  enedwaithDestinations: string[] = [];
  eriadorDestinations: string[] = [];
  rhovanionDestinations: string[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.fetchDestinations();
  }

  fetchDestinations() {
    this.httpService.get('destinations').subscribe((data: any) => {
      this.groupDestinationsByRealm(data);
    });
  }

  groupDestinationsByRealm(destinations: Destination[]): void {
    for (const destination of destinations) {
      if (destination.realm === 'Rohan') {
        this.rohanDestinations.push(destination.dest_code);
      } else if (destination.realm === 'Gondor') {
        this.gondorDestinations.push(destination.dest_code);
      } else if (destination.realm === 'Enedwaith') {
        this.enedwaithDestinations.push(destination.dest_code);
      } else if (destination.realm === 'Eriador') {
        this.eriadorDestinations.push(destination.dest_code);
      } else if (destination.realm === 'Rhovanion') {
        this.rhovanionDestinations.push(destination.dest_code);
      }
    }
  }
}
