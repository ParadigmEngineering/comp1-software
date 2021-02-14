import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.css']
})
export class ControlButtonComponent implements OnInit {
  @Input() buttonName;
  constructor() { }

  ngOnInit(): void {
  }

}
