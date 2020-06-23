import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Privilege } from '../interface/privilege.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userPrivilege = new BehaviorSubject<Privilege>(null);
  currentUserPrivilege = this.userPrivilege.asObservable();


  constructor() { }

  changePrivilege (privilege: Privilege) {
    this.userPrivilege.next(privilege);
  }
}


