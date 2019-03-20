import { Component, OnInit } from '@angular/core';
import { MS_CONV } from '../CONSTANTS';

@Component({
  selector: 'pom-sched',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  //Instance Variables
  jClock: Date;

  constructor() {}

  ngOnInit() {
    this.jClock = new Date(Date.now());
  }

  //Ticker function

}