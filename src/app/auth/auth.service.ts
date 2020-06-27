import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionInterface } from '../interface/session.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersession = new BehaviorSubject<SessionInterface>(null);
  currentSession = this.usersession.asObservable();

  constructor(private http: HttpClient, private router: Router) { }  

  changeSession (data_session: SessionInterface) {
    this.usersession.next(data_session);
  }
  
  login (user: any) {
    
  }
}
