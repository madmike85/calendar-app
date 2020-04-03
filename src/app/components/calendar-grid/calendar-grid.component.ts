import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { IDate } from 'src/app/models/date.model';
import { IEvent } from 'src/app/models/event.data';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
})
export class CalendarGridComponent implements OnInit {
  public days: IDate[];
  public daysOfWeek = [
    'Понедельник',
    'Вториник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  public events: IEvent;

  public selected: string;

  constructor(private calendarService: CalendarService, private eventService: EventService) {}

  ngOnInit(): void {
    this.calendarService.currentDaysState.subscribe((days) => {
      this.days = days;
      this.events = this.eventService.events;
    });
  }
}
