import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: Socket;
  private telemetryObserver: Observable<{}>;

  constructor() {
    this.socket = io('http://localhost:8080');
  }

  // EMITTER
  sendMessage(msg: string) {
    console.log(`send a msg to server`)
    this.socket.emit('telemetry', { message: msg });
  }

  // telemetry handler
  onTelemetry() {
    this.telemetryObserver = new Observable(observer => {
      this.socket.on('telemetry', msg => {
        observer.next(msg);
      });
    });
    return this.telemetryObserver;
  }

}