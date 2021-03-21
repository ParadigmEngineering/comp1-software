import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {

  armedFlag 
  private alarmsVar = ["No Alarms", "Communication Lost", "Gas Detected"];

  toggleFlag(){
    this.armedFlag=!this.armedFlag;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
