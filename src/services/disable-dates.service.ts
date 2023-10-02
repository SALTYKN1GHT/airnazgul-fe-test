import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisableDatesService {
  public disabledDates: Date[] = [];
  constructor() {}
  addDate(date: Date) {
    this.disabledDates.push(date);
  }
  getDates(): Date[] {
    return this.disabledDates;
  }
  removeDate(date: Date) {
    this.disabledDates = this.disabledDates.filter(
      item =>
        item.getFullYear() !== date.getFullYear() &&
        item.getMonth() !== date.getMonth() &&
        item.getDate() !== date.getDate()
    );
  }
}
