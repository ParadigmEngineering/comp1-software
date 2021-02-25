import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advance-retract',
  templateUrl: './advance-retract.component.html',
  styleUrls: ['./advance-retract.component.css']
})
export class AdvanceRetractComponent implements OnInit {

  advanceFlag = false; 

  toggleFlag(){
    this.advanceFlag=!this.advanceFlag;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
