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
    return this.http.post('http://localhost/pharmtech/api/user/login', JSON.stringify(user)).
    subscribe(response => {
      if (response['data'] != null) {
        const usersession = {
          userId: response['data'][0]['userId'],
          userName: response['data'][0]['userName'],
          userFname: response['data'][0]['userFname'],
          userMname: response['data'][0]['userMname'],
          userLname: response['data'][0]['userLname'],
          userLocId: response['data'][0]['userLocId'],
          userLocName: response['data'][0]['locName']
        };
        this.changeSession(usersession);
        this.router.navigate(["menu/dashboard"]);

        //set storage
        localStorage.clear();
        localStorage.setItem('session', JSON.stringify(usersession));
      } else {
        alert("user not found");
      }
      
    });
  }
}
