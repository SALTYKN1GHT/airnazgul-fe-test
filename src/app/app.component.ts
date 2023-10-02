import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { SearchInput } from 'src/interfaces/search-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  searchInput: SearchInput;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.fetchTicketData();
  }

  fetchTicketData() {
    this.httpService.get('ticket').subscribe(response => {
      // Do something with the ticket data
    });
  }
}
