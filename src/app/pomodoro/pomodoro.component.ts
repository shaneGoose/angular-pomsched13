import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pom-sched',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {
  //Instance Variables
  private startTime: number;
  private jClock: Date;
  private ticker;
  private rows: pInterval[];
  private range: number = 8;  //default 8hr work day
  private workCounter: number = 0;
  private shortCounter: number = 0;
  private longCounter: number = 0;
  private cycleCounter: number = 0;

  constructor() {}

  ngOnInit() {
    this.startTime = Date.now();
    this.jClock = new Date(this.startTime);
    this.ticker = setInterval(this.tick, 500);
    this.makeSchedule(8);
    //alert("This Ran");
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }

  //One shot: will not run unless invoked by form
  makeSchedule = (length: number) => {
    if (length < 6 || length > 16) {throw 'Illegal Argument Exception! Work hours must be between 6 and 16!'}

    const SHORT_MAX = Math.ceil(Math.sqrt(length));
    const WORK_MAX = SHORT_MAX + 1;
    let accum = 0;
    let id = 1;
    
    //Test field
    let temp: pInterval = {id: 1, time: new Date(this.startTime), interval: 'work'};
    this.rows.push(temp);
    temp = {id: 2, time: new Date(this.startTime + WORK), interval: 'short break'};
    this.rows.push(temp);
    alert("this ran");
  }

  //Ticker function
  tick = () => {
    this.jClock = new Date(Date.now());
  }

  //Helper functions
  sumCounters = ():number => {
    return this.longCounter + this.shortCounter + this.workCounter;
  }
}

interface pInterval {
  id: number,
  time: Date, //Got to convert with pipe
  interval: string
}

const MS_CONV = 60 * 1000;
const WORK = 25 * MS_CONV;
const SHORT = 5 * MS_CONV;
const LONG = 15 * MS_CONV;
const LUNCH = 30 * MS_CONV;