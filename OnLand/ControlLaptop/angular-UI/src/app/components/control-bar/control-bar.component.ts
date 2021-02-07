import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {
  @Input() pages: { name: string, route: string }[];
  @Input() activatedPage: string;
  constructor() {
    
  }
  ngOnInit(): void {
  }

}
