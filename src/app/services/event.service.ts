import { Injectable } from '@angular/core';
import { IEvent } from '../models/event.data';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public events: IEvent = {
    '3-4-2020': {
      title: 'Тест номер 1',
      participants: 'Маша, Даша, Паша',
      description: 'Тестовое описание номер 1',
      date: '3 Апрель',
    },
    '13-4-2020': {
      title: 'Тест номер 2',
      participants: 'Петя',
      description: 'Тестовое описание номер 2',
      date: '13 Апрель',
    },
    '13-5-2020': {
      title: 'Тест номер 3',
      participants: 'Вася',
      description: 'Тестовое описание номер 2',
      date: '13 Май',
    },
  };

  constructor() {}

  public addEvent(
    date: string,
    event: { title: string; participants: string; description: string; date: string },
  ): void {
    this.events[date] = event;
  }

  public getEvent(date: string): { title: string; participants: string; description: string } {
    return this.events[date];
  }

  public deleteEvent(date: string): void {
    if (this.events[date]) {
      delete this.events[date];
    }
  }

  public getEventsByTitle(title: string): { title: string; date: string }[] {
    return Object.values(this.events)
      .filter((event) => event.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
      .map((event) => {
        return { title: event.title, date: event.date };
      });
  }
}
