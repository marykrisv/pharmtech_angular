import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from '../interface/session';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersession = new BehaviorSubject<Session>(null);
  currentSession = this.usersession.asObservable();

  constructor(private http: HttpClient, private router: Router) { }  

  changeSession (data_session: Session) {
    this.usersession.next(data_session);
  }
  
  login (user: any) {
    
  }
}
