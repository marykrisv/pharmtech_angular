import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Session } from 'src/app/interface/session';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user_session: Session;
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private data: AuthService, private router: Router, private http: HttpClient) { }

  warning: string = null;

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

  get usernameInput () {
    return this.form.get('username');
  }

  get passwordInput () {
    return this.form.get('password');
  }

  login () {
    const user = {
      'userName': this.usernameInput.value,
      'userPassword': this.passwordInput.value
    }

    console.log(this.form.get('username').value);

    this.http.post('http://localhost/pharmtech/api/user/login', JSON.stringify(user)).
    subscribe(response => {
      if (response['data'] != null) {
        if (response['data'][0]['userIsLocked'] == '0') {
          const usersession = {
            userId: response['data'][0]['userId'],
            userName: response['data'][0]['userName'],
            userFname: response['data'][0]['userFname'],
            userMname: response['data'][0]['userMname'],
            userLname: response['data'][0]['userLname'],
            userLocId: response['data'][0]['userLocId'],
            userLocName: response['data'][0]['locName']
          };
          
          this.data.changeSession(usersession);
          this.router.navigate(["menu/dashboard"]);

          //set storage
          localStorage.clear();
          localStorage.setItem('session', JSON.stringify(usersession));
        } else {
          this.warning = 'User is locked. Please contact admin';
        }
      } else {
        this.warning = 'Username or password is incorrect!';
      }
    });
  }

  resetWarningMessage () {
    this.warning = null;
  }
}
