import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages: { name: string, route: string }[] = [
    { name: 'DASHBOARD', route: '/dashboard-page' },
    { name: 'NAVIGATION', route: '/navigation-page' },
    { name: 'POWER METRICS', route: '/powermetrics-page' },
    { name: 'CONTROL', route: '/control-page' },
    { name: 'CONFIGURATION', route: '/configuration-page' }
  ]
  activatedPage: string;

  constructor(private route: Router) {
    this.route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((route: NavigationEnd) => {
      this.activatedPage = route.urlAfterRedirects;
      console.log(`current route:: ${this.activatedPage}`)
    })
  }

}
