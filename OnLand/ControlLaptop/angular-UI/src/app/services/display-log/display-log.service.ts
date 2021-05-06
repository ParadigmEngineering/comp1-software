import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketioService } from '../socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayLogService {

  private displayLogObserver: Observable<{}>;
  constructor(private socketService: SocketioService) { }

  //testing with telemetry 
  getLogs(){
    this.displayLogObserver = new Observable(observer => {
      this.socketService.getSocket().on('telemetry', msg=> {
        observer.next(msg);
      })
    })
    return this.displayLogObserver;
  }
}
