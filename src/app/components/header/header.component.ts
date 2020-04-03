import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CalendarService } from 'src/app/services/calendar.service';
import { EventService } from 'src/app/services/event.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public eventForm: FormGroup;
  public model: any;

  constructor(
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private eventService: EventService,
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      event: new FormControl(''),
    });
  }

  formatter = (result: { title: string; date: string }) => result.title;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => (term === '' ? [] : this.eventService.getEventsByTitle(term))),
    );

  public add(form: FormGroup): void {
    const [
      date,
      time = '',
      title = '',
      participants = '',
      description = '',
    ] = form.value.event.split(/,\s/g);
    const [day, month] = date.split(' ');
    const monthIndex = this.calendarService.getMonthIndex(month);
    const eventDate = `${day}-${monthIndex}-${this.calendarService.getYear()}`;
    const event = {
      title,
      participants,
      description,
      date: `${date} ${month}`,
    };
    this.eventService.addEvent(eventDate, event);
  }
}
