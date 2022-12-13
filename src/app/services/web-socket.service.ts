import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public taoBatch: any;
  public taoSyncPercentage: any;
  taoUpdateId: any;
  @Output() progress: EventEmitter<boolean> = new EventEmitter();
  socket = io(environment.SOCKET_ENDPOINT)

  constructor() { }
  getPercentage() {
    this.socket.on('taoSyncPercentage', (data: any) => {
      this.taoSyncPercentage = data.taoSyncPercentage;
      this.taoBatch = data.batchId;
      this.taoUpdateId = data.updatedAt;
      this.newMessageReceived(data);
      this.progress.emit(data);
    });
  }
  socketOf() {
    this.socket.on('disconnectThatSoc', () => {
      this.socket.disconnect();
    });
  }

  newMessageReceived(data: any) {
    const observable = new Observable<any>(observer => {
      observer.next(data);
    });
    return observable;
  }
}
