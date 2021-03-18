import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SocketioService } from './services/socketio/socketio.service';

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

  constructor(private route: Router, private socket: SocketioService) {

    this.route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((route: NavigationEnd) => {
      this.activatedPage = route.urlAfterRedirects;
      console.log(`current route:: ${this.activatedPage}`)
    })

    // test sending and receiving message to/from the server 
    setInterval(() => {
      let random = Math.floor(Math.random() * (10 - 0 + 1) + 0);
      this.socket.sendMessage(`${random}`);
    }, 5000)
  }
    

}