import { Component, Input, OnInit } from '@angular/core';
import { minActualMax } from 'src/app/services/models';

@Component({
  selector: 'app-min-actual-max',
  templateUrl: './min-actual-max.component.html',
  styleUrls: ['./min-actual-max.component.css']
})
export class MinActualMaxComponent implements OnInit {
  @Input() title: string;
  @Input() datas: minActualMax[];

  constructor() { 
  }

  ngOnInit(): void {
    console.log(this.datas) 
  }
}
