import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-powermetrics-bar',
  templateUrl: './powermetrics-bar.component.html',
  styleUrls: ['./powermetrics-bar.component.css']
})
export class PowerMetricsBarComponent implements OnInit {
  @Input() pages: { name: string, route: string }[];
  @Input() activatedPage: string;
  constructor() {
    
  }
  ngOnInit(): void {
  }

}
