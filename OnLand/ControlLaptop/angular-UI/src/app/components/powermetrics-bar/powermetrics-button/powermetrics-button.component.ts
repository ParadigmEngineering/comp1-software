import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-powermetrics-button',
  templateUrl: './powermetrics-button.component.html',
  styleUrls: ['./powermetrics-button.component.css']
})
export class PowerMetricsButtonComponent implements OnInit {
  @Input() buttonName;
  constructor() { }

  ngOnInit(): void {
  }

}
