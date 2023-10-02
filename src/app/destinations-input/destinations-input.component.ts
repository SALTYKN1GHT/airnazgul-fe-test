import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Destination } from 'src/interfaces/destination';
import { SearchInput } from 'src/interfaces/search-input';
import { HttpService } from 'src/services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destinations-input',
  templateUrl: './destinations-input.component.html',
  styleUrls: ['./destinations-input.component.scss'],
})
export class DestinationsInputComponent implements OnChanges {
  @Input() label: string = '';
  @Input() classnames: string = 'card p-2';
  @Input() seatsVisible: boolean = false;
  @Input() from: string = '';
  @Input() to: string = '';
  @Input() departure: string = '';
  @Input() return: string = '';
  @Input() checkStatus: boolean = false;

  public destination: Destination[] = [];
  public filteredDestination: Destination[] = [];
  public blacklistedDates: Date[] = [];
  public returnChecked: boolean = true;
  public selectedDestination: [Destination | null, Destination | null] = [null, null];
  public selectedDates: [Date | null, Date | null] = [null, null];
  public noReturn: boolean = false;
  public allFieldsComplete: boolean = false;

  public searchInputListener$: Observable<SearchInput>;

  constructor(
    private httpService: HttpService,
    private router: Router) {
    this.httpService.get('destinations').subscribe(data => {
      this.destination = data as any;
      this.filteredDestination = data as any;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanges');
    console.log(changes);
    const splitted = this.from.split(',');
    console.log(splitted);

    const init = this.filteredDestination.filter(item => item.settlement === this.from);
    console.log(init);
    // this.selectedDestination[0] =
  }
  ngOnInit(): void {}

  getRidOfMordor() {
    return this.filteredDestination.filter(item => {
      return !item.realm.includes('Mordor');
    });
  }

  getCheckStatus(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.returnChecked = !target.checked;
  }

  getDestinations(destination: Destination, id: number) {
    this.selectedDestination[id] = destination;
    this.noReturn = destination.realm.includes('Mordor');
  }

  onSubmit() {
    const queryParams = {
      from: this.selectedDestination[0]?.settlement,
      to: this.selectedDestination[1]?.settlement,
      departure: this.selectedDates[0]?.toLocaleString('en-EN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      return: this.selectedDates[1]?.toLocaleString('en-EN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      seats: 1,
      checkStatus: !this.returnChecked,
    };
    console.log(queryParams);
    this.router.navigate(['ticket-list'], {
      queryParams: queryParams,
    });
  }

  addItem(id: number): void {
    this.filteredDestination = this.destination.filter(d => d.id != id);
  }
  blackListDate(date: Date, id: number): void {
    this.blacklistedDates.push(date);
    this.selectedDates[id] = date;
  }
  validate(event: Event): void {
    const date = (event.target as HTMLInputElement).value;
    if (this.blacklistedDates.includes(new Date(date))) {
      (event.target as HTMLInputElement).value = '';
    }
  }
  checkValues(): boolean {
    const destination = this.selectedDestination.every(item => !!item) || (!!this.from && !!this.to);
    const dates = this.selectedDates.every(item => !!item) || (this.returnChecked && !!this.selectedDates[0]);
    const dateinput =
      dates ||
      (!!this.departure && !!this.return) ||
      (!!this.departure && this.returnChecked) ||
      (!!this.selectedDates[1] && !this.returnChecked);
    return destination && dateinput;
  }
}
