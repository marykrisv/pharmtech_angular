import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrivilegeInterface } from '../interface/privilege.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userPrivilege = new BehaviorSubject<PrivilegeInterface>(null);
  currentUserPrivilege = this.userPrivilege.asObservable();


  constructor() { }

  changePrivilege (privilege: PrivilegeInterface) {
    this.userPrivilege.next(privilege);
  }
}


