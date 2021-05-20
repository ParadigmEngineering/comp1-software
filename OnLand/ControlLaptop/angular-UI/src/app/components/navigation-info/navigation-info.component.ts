import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-navigation-info',
  templateUrl: './navigation-info.component.html',
  styleUrls: ['./navigation-info.component.css']
})
export class NavigationInfoComponent implements OnInit {
  private telemetrySubscriber: Subscription;
  navData: number;
 
  constructor(private navigation: NavigationService) {
    this.telemetrySubscriber = this.navigation.onNavigation().subscribe((msg: { message: number }) => {
      console.log('got a msg from server for Navigation: ' + JSON.stringify(msg));
      this.navData = msg.message;
    }); 
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }

}