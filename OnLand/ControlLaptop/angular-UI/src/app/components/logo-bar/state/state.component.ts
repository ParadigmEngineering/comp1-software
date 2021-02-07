import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  armedFlag = false;

  toggleFlag(){
    this.armedFlag=!this.armedFlag;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
