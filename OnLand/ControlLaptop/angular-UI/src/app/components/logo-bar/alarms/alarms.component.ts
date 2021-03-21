import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NaturalGasService } from 'src/app/services/natural-gas/natural-gas.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {
  private telemetrySubscriber: Subscription;
  armedFlag: string = "No Alarms";
  armStyle = { 'background-color': '#3B824F' };
  private alarmsVar = ["No Alarms", "Communication Lost", "Gas Detected"];

  constructor(private naturalGas: NaturalGasService) { }

  ngOnInit(): void {
    this.telemetrySubscriber = this.naturalGas.onNatural().subscribe((msg: { message: number }) => {
      console.log('got a msg from server: ' + JSON.stringify(msg));
      switch (parseInt(msg.message)) {
        case 1:
          this.armedFlag = this.alarmsVar[0];
          this.armStyle = { 'background-color': '#3B824F' }
          break;
        case 2:
          this.armedFlag = this.alarmsVar[1];
          this.armStyle = { 'background-color': '#A10B0B' }
          break;
        case 3:
          this.armedFlag = this.alarmsVar[2];
          this.armStyle = { 'background-color': 'yellow' }
          break;
        default:
      }
    });

  }
  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }

}
