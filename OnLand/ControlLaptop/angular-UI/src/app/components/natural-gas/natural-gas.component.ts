import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { minActualMax } from 'src/app/services/models';
import { NaturalGasService } from 'src/app/services/natural-gas/natural-gas.service';

@Component({
  selector: 'app-natural-gas',
  templateUrl: './natural-gas.component.html',
  styleUrls: ['./natural-gas.component.css']
})
export class NaturalGasComponent implements OnInit {

  private telemetrySubscriber: Subscription;
  datas: minActualMax [] = [];
  data: minActualMax;
  title: string = "Natural Gas";
  constructor(private naturalGas: NaturalGasService) {
    this.data = {
      min: 5, //this will be reassign in the future
      actual: 0,
     max: 10 //this will be reassign in the future
    }
  }

  ngOnInit(): void {
    this.telemetrySubscriber = this.naturalGas.onNatural().subscribe((msg: { message: number }) => {
      console.log('got a msg from server: ' + JSON.stringify(msg));
      this.data.actual = msg.message;
    });
    this.datas.push(this.data);
  }

  ngOnDestroy() {
    this.telemetrySubscriber.unsubscribe();
  }

}
