import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pom-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  //Instance Variables
  isTextShowing:boolean;
  showText:string;

  constructor() {
  }

  ngOnInit() {
    this.isTextShowing = true;
    this.showText = 'hide';
  }

  toggleInfo = () => {
    this.isTextShowing = !this.isTextShowing;
    this.isTextShowing ? this.showText = 'hide' : this.showText = 'show info';
    //alert(this.isTextShowing)
  }
}