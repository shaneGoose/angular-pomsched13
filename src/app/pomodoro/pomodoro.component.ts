import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pom-sched',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  //Instance Variables
  private jClock: Date;
  private ticker;
  private rows: pInterval[];

  constructor() {}

  ngOnInit() {
    this.jClock = new Date(Date.now());
    this.ticker = setInterval(this.tick, 500);
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }

  //Ticker function
  tick = () => {
    this.jClock = new Date(Date.now());
  }
}

interface pInterval {
  id: number,
  time: Date, //Got to convert with pipe
  interval: string
}