import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketioService } from '../socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class NaturalGasService {

  private telemetryObserver: Observable<{}>;
  constructor(private socketService: SocketioService) { }

  // listen to response for "telemetry" for now
  onNatural() {
    this.telemetryObserver = new Observable(observer => {
      this.socketService.getSocket().on('telemetry', msg => {
        observer.next(msg);
      });
    });
    return this.telemetryObserver;
  }
}
