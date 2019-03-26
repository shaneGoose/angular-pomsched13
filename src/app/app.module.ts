import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';


@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, ReactiveFormsModule ],
  declarations: [ 
    AppComponent, 
    TitleComponent,
    PomodoroComponent 
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
