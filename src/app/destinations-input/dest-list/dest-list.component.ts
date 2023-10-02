import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Destination } from 'src/interfaces/destination';

@Component({
  selector: 'app-dest-list',
  templateUrl: './dest-list.component.html',
  styleUrls: ['./dest-list.component.scss'],
})
export class DestListComponent {
  @Input() value: string = '';
  @Input() public destList: Destination[] = [];
  @Input() public searchBarType: string = '';
  @Output() searchListChangeEvent = new EventEmitter<number>();
  @Output() public onSelect = new EventEmitter<Destination>();
  @ViewChild('searchBar') public searchBar!: ElementRef;
  public listVisible: boolean = false;
  public result: Destination[] = [];
  public listIndex: number = 0;

  onSearch(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && this.result.length > 0) {
      if (this.listIndex >= this.result.length - 1) this.listIndex = 0;
      else this.listIndex++;
    } else if (event.key === 'ArrowUp' && this.result.length > 0) {
      if (this.listIndex <= 0) this.listIndex = this.result.length;
      else this.listIndex--;
    } else if (event.key === 'Enter') {
      this.onClick(event, this.listIndex);
    } else {
      this.listIndex = 0;
      const searchInput: string = (event.target as HTMLInputElement).value;
      const searchQuery: string = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
      this.listVisible = !!searchQuery;
      this.result = this.destList.filter(item => {
        const destRealm = item.realm + ', ' + item.settlement;
        const destSettlement = item.settlement + ', ' + item.realm;
        return destRealm.includes(searchQuery) || destSettlement.includes(searchQuery);
      });
    }
  }
  onClick(event: Event, index: number): void {
    this.listVisible = false;
    (this.searchBar?.nativeElement as HTMLInputElement).value =
      this.result[index].realm + ' ' + this.result[index].settlement;
    this.searchListChangeEvent.emit(this.result[index].id);
    this.onSelect.emit(this.result[index]);
  }
}
