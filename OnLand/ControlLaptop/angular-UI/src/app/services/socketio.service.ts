import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8080');
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('telemetry', { message: msg });
  }

  // HANDLER
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('telemetry', msg => {
        observer.next(msg);
      });
    });
  }

}