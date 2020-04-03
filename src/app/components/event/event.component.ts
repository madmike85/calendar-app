import { Component, OnInit, Input } from '@angular/core';
import { IDate } from 'src/app/models/date.model';
import { EventService } from 'src/app/services/event.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() public day: IDate;

  public eventForm: FormGroup;

  public event: { title: string; participants: string; description: string };
  public month: string;

  constructor(
    private eventService: EventService,
    private caledarService: CalendarService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.event = this.eventService.getEvent(this.day.dateAttr);
    this.month = this.caledarService.getMonth();
    this.eventForm = this.formBuilder.group({
      title: new FormControl(this.event ? this.event.title : '', [Validators.required]),
      date: new FormControl(''),
      participants: new FormControl(this.event ? this.event.participants : ''),
      description: new FormControl(this.event ? this.event.description : ''),
    });
  }

  public delete(date: string): void {
    this.eventService.deleteEvent(date);
  }

  public add(form: FormGroup): void {
    const event = {
      title: form.value.title,
      participants: form.value.participants,
      description: form.value.description,
      date: `${this.day.day} ${this.month}`,
    };
    this.eventService.addEvent(this.day.dateAttr, event);
  }
}
