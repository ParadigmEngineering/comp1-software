import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: { name: string, route: string }[] = [
    { name: 'DASHBOARD', route: '/dashboard-page' },
    { name: 'NAVIGATION', route: '/navigation-page' },
    { name: 'POWER METRICS', route: '' },
    { name: 'CONTROL', route: '' },
    { name: 'CONFIGURATION', route: '' }
  ]
  title = 'angular-UI';
}
