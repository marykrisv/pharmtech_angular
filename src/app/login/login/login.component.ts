import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Session } from 'src/app/interface/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user_session: Session;

  constructor(private data: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.data.currentSession.subscribe(
      usersession => this.user_session = usersession
    );
    // this.router.navigate(['login']);
    //check if in session
    if (localStorage.getItem('session') == null) {
      // do nothing
    } else {
      //get localStorage sesson and set as currentSession
      let jsonObj: any = JSON.parse(localStorage.getItem('session')); // string to generic object first
      let session: Session = <Session>jsonObj;
      this.data.changeSession(session);
      this.router.navigate(["menu/dashboard"]);
    }   
  }

  login () {
    const user = {
      'userName': 'admincebu',
      'userPassword': 'admin'
    }
    this.data.login(user);
  }
}
