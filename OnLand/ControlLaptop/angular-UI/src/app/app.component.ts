import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: { name: string, routes: string }[] = [
    { name: 'HOME', routes: '/home-page' },
    { name: 'SCHEMATICS', routes: '/schematics' },
    { name: 'CONFIGURATION', routes: '' },
    { name: 'CONFIGURATION', routes: '' },
    { name: 'CONFIGURATION', routes: '' }
  ]
  title = 'angular-UI';
}
