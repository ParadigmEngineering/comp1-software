import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { minActualMax } from 'src/app/services/models';
import { PowerMetricTableService } from 'src/app/services/power-metric-table/power-metric-table.service';

@Component({
  selector: 'app-power-metric-table',
  templateUrl: './power-metric-table.component.html',
  styleUrls: ['./power-metric-table.component.css']
})
export class PowerMetricTableComponent implements OnInit {
  private telemetrySubscriber: Subscription;
  datas: minActualMax [] = [];
  data: minActualMax;
  title: string = "Power Metrics";
  constructor(private PowerMetric: PowerMetricTableService) {
    this.data = {
      min: 5, //this will be reassign in the future
      actual: 0,
     max: 10 //this will be reassign in the future
    }
  }

  ngOnInit(): void {
    this.telemetrySubscriber = this.PowerMetric.onPower().subscribe((msg: { message: number }) => {
      console.log('got a msg from server: ' + JSON.stringify(msg));
      this.data.actual = msg.message;
    });
    this.datas.push(this.data);
  }

  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }

}
