import { Session } from './interface/session';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private menuSelected = new BehaviorSubject<string>("dashboard");
  currentMenuSelected = this.menuSelected.asObservable();

  private usersession = new BehaviorSubject<Session>(null);
  currentSession = this.usersession.asObservable();


  constructor() { }

  changeMenuSelected (selected: string) {
    this.menuSelected.next(selected);
  }

  changeSession (data_session: Session) {
    this.usersession.next(data_session);
  }
}


