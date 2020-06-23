import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private usersession = new BehaviorSubject<Session>(null);
  // currentSession = this.usersession.asObservable();


  constructor() { }

  // changeSession (data_session: Session) {
  //   this.usersession.next(data_session);
  // }
}


