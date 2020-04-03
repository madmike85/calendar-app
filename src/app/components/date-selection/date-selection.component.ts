import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss'],
})
export class DateSelectionComponent implements OnInit {
  public month: string;
  public year: number;
  constructor(private calendarService: CalendarService) {}

  public ngOnInit(): void {
    this.calendarService.currentMonthState.subscribe((month) => {
      this.month = month;
    });

    this.calendarService.currentYearState.subscribe((year) => (this.year = year));
  }

  public next(): void {
    this.calendarService.nextMonth();
  }

  public prev(): void {
    this.calendarService.prevMonth();
  }

  public today(): void {
    this.calendarService.today();
  }
}
