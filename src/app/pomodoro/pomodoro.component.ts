import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'pom-sched',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
  animations: [
    trigger('flash', [
      state('high', style({
        opacity: 1,
        backgroundColor: 'red'
      })),
      state('low', style({
        opacity: 0.15,
        color: 'red'
      })),
      transition('high <=> low', [
        animate('1s')
      ])
    ])
  ]
})
export class PomodoroComponent implements OnInit {
  //Instance Variables
  private activeRow: number;  //Flagger for animation if I can get it to work
  private startTime: number;
  private jClock: Date;
  private ticker;
  private rows: pInterval[] = [];
  private range: number = 8;  //default 8hr work day
  private workCounter: number = 0;
  private shortCounter: number = 0;
  private longCounter: number = 0;
  private lunchCounter: number = 0;
  private fortyfiveCounter: number = 0;
  private shiftCounter: number = 0;

  constructor() { }

  ngOnInit() {
    this.startTime = Date.now();
    this.jClock = new Date(this.startTime);
    this.ticker = setInterval(this.tick, 150);
    this.makeSchedule(8);
  }

  //Test function
  testSet = () => {
    this.activeRow = 1;
  }

  ngOnDestroy() {
    clearInterval(this.ticker);
  }

  //One shot: will not run unless invoked by form
  makeSchedule = (length: number) => {
    if (length < 6 || length > 16) { throw 'Illegal Argument Exception! Work hours must be between 6 and 16!' }
    /*
    const SHORT_MAX = Math.ceil(Math.sqrt(length));
    const WORK_MAX = SHORT_MAX + 1;
    let accum = 0;
    let id = 1;
    */

    //Test field    

    //Start building the table here
    let id = 1;
    let runTime = this.startTime
    let temp: pInterval = { id: id++, time: new Date(runTime), interval: 'work' };
    runTime = runTime + WORK;
    this.workCounter++;
    let accum = WORK;
    this.rows.push(temp);
    do {
      //Enter with [1, 0, 0, 0, 0] state
      //Make base with alternate work and break then modify on the back end
      if ((this.sumCounters() % length) % 2 === 0) {
        temp = { id: id++, time: new Date(runTime), interval: 'work' };
        this.rows.push(temp);
        runTime = runTime + WORK;
        accum = accum + WORK;
        this.workCounter++;
      }
      else if ((this.sumCounters() % length) % 2 === 1) {
        temp = { id: id++, time: new Date(runTime), interval: 'break' };
        this.rows.push(temp);
        runTime = runTime + SHORT;
        accum = accum + SHORT;
        this.shortCounter++;
      }

      //Backend mods, check the last entry and make mods for long break, lunch, and special cases
      if (this.sumCounters() % length === 0 && this.longCounter === this.lunchCounter) {
        temp = { id: id++, time: new Date(runTime), interval: 'long break' };
        this.rows[this.rows.length - 1] = temp;
        runTime = runTime + LONG;
        accum = accum + LONG;
        this.shortCounter--;
        this.longCounter++;
      }
      else if (this.sumCounters() % length === 0 && this.lunchCounter < this.longCounter) {
        temp = { id: id++, time: new Date(runTime), interval: 'lunch' };
        this.rows[this.rows.length - 1] = temp;
        runTime = runTime + LUNCH;
        accum = accum + LUNCH;
        this.shortCounter--;
        this.lunchCounter++;
      }

      //Backend mods for double shifts (greater than 8 hours)

      //append retire to the schedule
      if (accum >= length * 60 * MIN_TO_MS) {
        temp = { id: id++, time: new Date(runTime), interval: 'retire' };
        this.rows.push(temp);
        this.shiftCounter++;
      }

    } while (accum < length * 60 * MIN_TO_MS)
  }

  //Ticker function
  tick = () => {
    this.jClock = new Date(Date.now());
  }

  //Helper functions
  sumCounters = (): number => {
    return this.longCounter + this.shortCounter + this.workCounter + this.lunchCounter + this.fortyfiveCounter;
  }
}

interface pInterval {
  id: number,
  time: Date, //Got to convert with pipe
  interval: string
}

const MIN_TO_MS = 60 * 1000;
const WORK = 25 * MIN_TO_MS;
const SHORT = 5 * MIN_TO_MS;
const LONG = 15 * MIN_TO_MS;
const LUNCH = 30 * MIN_TO_MS;
const FORTYFIVE = 45 * MIN_TO_MS;