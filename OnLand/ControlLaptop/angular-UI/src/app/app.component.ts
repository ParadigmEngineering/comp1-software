import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: { name: string, routes: string }[] = [
    { name: 'DASHBOARD', routes: '/home-page' },
    { name: 'NAVIGATION', routes: '/schematics' },
    { name: 'POWER METRICS', routes: '' },
    { name: 'CONTROL', routes: '' },
    { name: 'CONFIGURATION', routes: '' }
  ]
  title = 'angular-UI';
}
