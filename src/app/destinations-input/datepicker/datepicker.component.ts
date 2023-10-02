import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Calendar } from 'src/interfaces/calendar';
import { CalendarBuilderService } from 'src/services/calendar-builder.service';
import { DisableDatesService } from 'src/services/disable-dates.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @Input() value: string = '';
  @Input() public disabledDates: Date[] = [];
  @Input() public disabled: boolean = false;
  @Output('onSelect') public change = new EventEmitter<Date>();
  @ViewChild('dateInputField') public dateInputField: ElementRef<HTMLInputElement>;
  @ViewChild('calendarContainer') public calendarContainer: ElementRef<HTMLDivElement>;

  public calendar: Calendar = { previous: [], current: [], next: [] };
  public calendarVisible: boolean = false;
  public month: string = '';
  public monthIndex: number = 0;
  public year: string = '';
  public monthList: string[] = [];
  public yearList: string[] = [];
  public yearVisible: boolean = false;
  public monthVisible: boolean = false;
  public dayVisible: boolean = true;
  public actualDate: string = '';
  constructor(private calendarBuilder: CalendarBuilderService, private disabledDatesService: DisableDatesService) {}

  ngAfterViewInit(): void {
    document.addEventListener('click', (event: MouseEvent) => {
      const clicktarget = event.target as HTMLDivElement;
      if (!this.isDescendant(this.calendarContainer?.nativeElement, clicktarget)) {
        console.log(clicktarget);
        this.calendarVisible = false;
      }
    });
  }
  ngAfterViewChecked(): void {
    this.onDisable();
  }
  ngOnInit() {
    const date = new Date();
    this.month = date.toLocaleString('en-US', { month: 'long' });
    this.monthIndex = date.getMonth();
    this.year = date.toLocaleString('en-US', { year: 'numeric' });
    this.monthList = this.genList(12, 'month');
    this.yearList = this.genList(12, 'year');
    this.calendar = this.calendarBuilder.buildMonth(date.getFullYear(), date.getMonth());
    this.onDisable();
  }
  genList(n: number, input: 'year' | 'month') {
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    const list: string[] = [];
    for (let i: number = 0; i < n; i++) {
      // Generate years
      if (input === 'year') {
        list.push(new Date(actualYear + i, 0).toLocaleString('en-US', { year: 'numeric' }));
        // Generate months
      } else {
        list.push(new Date(1970, i).toLocaleString('en-US', { month: 'long' }));
      }
    }
    return list;
  }
  onSwitchMonth(event: Event) {
    this.dayVisible = false;
    this.monthVisible = true;
    this.yearVisible = false;
    event.stopPropagation();
  }
  onSwitchYear(event: Event) {
    this.dayVisible = false;
    this.monthVisible = false;
    this.yearVisible = true;
    event.stopPropagation();
  }
  onMonthClick(event: Event, item: string, i: number) {
    this.calendar = this.calendarBuilder.buildMonth(+this.year, i);
    this.onDisable();
    this.month = item;
    this.monthIndex = i;
    this.monthVisible = false;
    this.yearVisible = false;
    this.dayVisible = true;
    event.stopPropagation();
  }

  onYearClick(event: Event, item: string) {
    this.year = item;
    this.monthVisible = true;
    this.yearVisible = false;
    this.dayVisible = false;
    event.stopPropagation();
  }
  onDayClick(item: { value: number; disabled: boolean }) {
    this.disabledDatesService.removeDate(new Date(this.actualDate || this.value));
    const date = new Date(+this.year, this.monthIndex, item.value);
    this.actualDate = date.toLocaleString('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    this.calendarVisible = false;
    this.disabledDatesService.addDate(date);
    this.change.emit(date);
  }
  onInputFieldClick() {
    this.calendarVisible = !this.calendarVisible;
  }
  onDisable() {
    const currentYear = +this.year;
    const currentMonth = this.monthIndex;
    const filteredDates = this.disabledDatesService
      .getDates()
      .filter(item => {
        return item.getFullYear() === currentYear && item.getMonth() === currentMonth;
      })
      .map(item => item.getDate());
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    this.calendar.current = this.calendar.current.map(item => {
      return {
        value: item.value,
        disabled: filteredDates.includes(item.value) || item.value < date.getTime(),
      };
    });
  }
  isDescendant(ancestor?: HTMLElement, child?: ParentNode | null): boolean {
    if (!child || !ancestor) {
      // If the child element doesn't exist, it can't be a descendant.
      return false;
    }

    if (child === ancestor) {
      console.log('child === ancestor');
      // If the child is the same as the ancestor, it is a descendant.
      return true;
    }
    console.log('Ancestor:', ancestor);
    console.log('Child:', child);
    console.log('Month visible:', this.monthVisible);

    // Recursively check the parent of the current child element.
    return this.isDescendant(ancestor, child.parentNode);
  }
  getDays() {
    return this.calendar.current.map(item => ({
      value: new Date(item.value).getDate(),
      disabled: item.disabled,
    }));
  }
}
