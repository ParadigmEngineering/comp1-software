import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-configuration-bar',
  templateUrl: './configuration-bar.component.html',
  styleUrls: ['./configuration-bar.component.css']
})
export class ConfigurationBarComponent implements OnInit {
  @Input() pages: { name: string, route: string }[];
  @Input() activatedPage: string;
  constructor() {
    
  }
  ngOnInit(): void {
  }

}
