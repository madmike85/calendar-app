import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDate } from '../models/date.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private currentDate = new Date();
  private currentMonth = this.currentDate.getMonth();
  private currentYear = this.currentDate.getFullYear();
  public months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  public daysSource: BehaviorSubject<IDate[]> = new BehaviorSubject(this.getDays());
  public currentDaysState: Observable<IDate[]> = this.daysSource.asObservable();

  public monthSource: BehaviorSubject<string> = new BehaviorSubject(this.months[this.currentMonth]);
  public currentMonthState: Observable<string> = this.monthSource.asObservable();

  public yearSource: BehaviorSubject<number> = new BehaviorSubject(this.currentYear);
  public currentYearState: Observable<number> = this.yearSource.asObservable();

  constructor() {}

  public getDays(year = this.currentYear, month = this.currentMonth): IDate[] {
    let firstDayOfCurrentMonth: number = new Date(year, month, 1).getDay() - 1;
    if (firstDayOfCurrentMonth < 0) firstDayOfCurrentMonth = 6;
    const lastDateOfCurrentMonth: number = new Date(year, month + 1, 0).getDate();
    let lastDateOfLastMonth: number =
      month === 0 ? new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate();
    let diffDays: number = 0 - firstDayOfCurrentMonth;

    const days: IDate[] = [];

    while (diffDays < 0) {
      const date = {
        day: lastDateOfLastMonth - 1,
        dateAttr: `${lastDateOfLastMonth - 1}-${
          this.currentMonth - 1 < 0 ? 1 : this.currentMonth
        }-${this.currentMonth - 1 < 0 ? this.currentYear - 1 : this.currentYear}`,
      };

      lastDateOfLastMonth--;
      days.unshift(date);
      diffDays++;
    }

    for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
      const date = {
        day: i,
        dateAttr: `${i}-${this.currentMonth + 1}-${this.currentYear}`,
      };
      days.push(date);
    }

    return days;
  }

  public nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.refresh();
  }

  public prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.refresh();
  }

  public getMonth(): string {
    return this.months[this.currentMonth];
  }

  public today(): void {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();

    this.refresh();
  }

  public refresh(): void {
    this.yearSource.next(this.currentYear);
    this.monthSource.next(this.months[this.currentMonth]);

    this.daysSource.next(this.getDays(this.currentYear, this.currentMonth));
  }

  public getMonthIndex(monthName: string): number {
    return (
      this.months.findIndex((month: string) =>
        month.toLowerCase().includes(monthName.toLocaleLowerCase().slice(0, -1)),
      ) + 1
    );
  }

  public getYear(): number {
    return this.currentYear;
  }
}
