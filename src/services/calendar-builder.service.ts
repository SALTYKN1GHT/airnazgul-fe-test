import { Injectable } from '@angular/core';
import { create } from 'domain';
import { Calendar } from 'src/interfaces/calendar';

@Injectable({
  providedIn: 'root',
})
export class CalendarBuilderService {
  constructor() {}

  buildMonth(year: number, month: number): Calendar {
    const monthIndex: number = month + 1; // Date object index correction new Date().getMonth() = 0 => január
    const numberOfDaysInMonth = new Date(year, monthIndex, 0).getDate(); // Gets how many dates are in the actual month (28, 29, 30, 31)
    const daysOfMonth: Calendar = {
      previous: [],
      current: [],
      next: [],
    };

    /**
     * DayIndex is like:
     * Sunday = 0
     * Monday = 1
     * Tuesday = 2
     * Wednesday = 3
     * Thursday = 4
     * Friday = 5
     * Saturday = 6
     */

    // Previous month dates
    const actualMonthFirstDayIndex = this.getDayIndex(year, month, 1);
    let firstDayOffset: number = 0;
    // If actualMonthFirstDayIndex is not on Monday, previous dates are generated, if index = 1 (Monday) => No need for previous month dates
    if (actualMonthFirstDayIndex != 1) {
      if (actualMonthFirstDayIndex === 0) {
        firstDayOffset = -5;
        const firstDay = new Date(year, month, firstDayOffset).getDate();
        daysOfMonth.previous = this.genExtraDays(year, month, firstDay, true);
      } else {
        firstDayOffset = 2 - actualMonthFirstDayIndex; // DayIndex is 2, 3, 4, 5, or 6
        const firstDay = new Date(year, month, firstDayOffset).getDate();
        daysOfMonth.previous = this.genExtraDays(year, month, firstDay, true);
      }
    }

    //Actual month's dates

    for (let i: number = 1; i <= numberOfDaysInMonth; i++) {
      daysOfMonth.current.push({ value: new Date(year, month, i).getTime(), disabled: false });
    }

    //Next month dates
    const actualMonthLastDayIndex = this.getDayIndex(year, monthIndex, 0);
    // If actualMonthLastDayIndex === 0 (Sunday) => No need for next month dates
    if (actualMonthLastDayIndex != 0) {
      const lastDay = new Date(year, monthIndex, 7 - actualMonthLastDayIndex).getDate();
      daysOfMonth.next = this.genExtraDays(year, monthIndex, lastDay);
    }
    return daysOfMonth;
  }

  getDayIndex(year: number, month: number, day: number): number {
    const date = new Date(year, month, day);
    return date.getDay();
  }

  genExtraDays(year: number, month: number, day: number, reverse?: boolean): number[] {
    const days: number[] = [];
    if (reverse && day > 0) {
      const date = new Date(year, month, 0).getDate(); // Previous month last day, the for cycle goes from that day until reach day input param
      for (let i: number = date; i >= day; i--) {
        days.push(i);
      }
      return days.reverse();
    } else {
      for (let i: number = 1; i <= day; i++) {
        days.push(i);
      }
      return days;
    }
  }
}
