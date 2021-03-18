import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NaturalGasService } from 'src/app/services/natural-gas/natural-gas.service';

@Component({
  selector: 'app-min-actual-max',
  templateUrl: './min-actual-max.component.html',
  styleUrls: ['./min-actual-max.component.css']
})
export class MinActualMaxComponent implements OnInit {
  actualValue: number;
  private telemetrySubscriber: Subscription;
  constructor(private naturalGas: NaturalGasService) { }

  ngOnInit(): void {
    this.telemetrySubscriber = this.naturalGas.onNatural().subscribe((msg) => {
      console.log('got a msg from server: ' + JSON.stringify(msg));
      this.actualValue = msg.message;
    });
  }

  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }
}
