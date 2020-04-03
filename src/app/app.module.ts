import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DateSelectionComponent } from './components/date-selection/date-selection.component';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import { TodayDirective } from './directives/today.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from './components/event/event.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DateSelectionComponent,
    CalendarGridComponent,
    TodayDirective,
    EventComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
