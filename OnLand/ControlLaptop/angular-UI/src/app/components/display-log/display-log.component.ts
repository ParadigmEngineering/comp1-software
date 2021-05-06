import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DisplayLogService } from 'src/app/services/display-log/display-log.service';
@Component({
  selector: 'app-display-log',
  templateUrl: './display-log.component.html',
  styleUrls: ['./display-log.component.css']
})

export class DisplayLogComponent implements OnInit {
  private telemetrySubscriber: Subscription;
  logOutput: string = "DUMMY0<br/>";
  armStyle = { 'background-color': '#3B824F' };
  private outputVar = ["Advancing<br/>", "Retracting<br/>", "Neutral<br/>"];

  constructor(private displayLogService:DisplayLogService) { }

  ngOnInit(): void {
    this.telemetrySubscriber = this.displayLogService.getLogs().subscribe((msg: { message: string }) => {
      console.log('got a msg from server: ' + JSON.stringify(msg));
      switch (parseInt(msg.message)) {
        case 1:
          this.logOutput += this.outputVar[0] ;
          break;
        case 2:
          this.logOutput += this.outputVar[1];
          break;
        case 3:
          this.logOutput += this.outputVar[2];
          break;
        default:
          console.log('N/A')
      }
    });

  }
  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }

}