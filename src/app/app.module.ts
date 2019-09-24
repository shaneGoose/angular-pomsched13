import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';


@NgModule({
  imports:      [ BrowserAnimationsModule, ReactiveFormsModule ],
  declarations: [ 
    AppComponent, 
    TitleComponent,
    PomodoroComponent 
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
