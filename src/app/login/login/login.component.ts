import { ToolConfig } from './../../common/toolconfig';
import { PasswordValidator } from './../../validators/password.validator';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Session } from 'src/app/interface/session';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeStamp } from 'console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  numberOfTries = 6;
  ctr = 0;
  view;
  title;
  user_session: Session;
  warning: string = null;
  resetPasswordWarning: string = null;
  userId: number;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  resetPassword = new FormGroup({
    newpassword: new FormControl('', [Validators.required, PasswordValidator.isPasswordInvalid]),
    confirmpassword: new FormControl('', Validators.required)
  });

  constructor(private data: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.view = 'login';
    this.title = 'Login';

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

  get newpasswordInput () {
    return this.resetPassword.get('newpassword');
  }

  get confirmpasswordInput () {
    return this.resetPassword.get('confirmpassword');
  }

  login () {
    const user = {
      'userName': this.usernameInput.value,
      'userPassword': this.passwordInput.value
    }

    this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/login', JSON.stringify(user)).
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

          //update password required for new user
          if (response['data'][0]['userIsNew'] == '1') {     
            alert("Welcome new user. Please update your password first.");       
            this.userId = response['data'][0]['userId'];

            //clear everything
            this.resetPasswordWarning = null;
            this.newpasswordInput.setValue('');
            this.confirmpasswordInput.setValue('');

            this.view = 'resetPassword';
            this.title = 'Reset Password';
          } else {       
            //successful login   
            //set storage
            localStorage.clear();
            localStorage.setItem('session', JSON.stringify(usersession));
            this.router.navigate(["menu/dashboard"]);            
          }
        } else {
          this.warning = 'User is locked. Please contact admin';
        }
      } else {
        this.warning = 'Username or password is incorrect!';
        this.ctr++;

        if (this.ctr == this.numberOfTries) {
          console.log("lock user");
        }
      }
      
      this.usernameInput.setValue('');
      this.passwordInput.setValue('');
    });
  }

  confirmNewPassword() {  
    if (this.newpasswordInput.errors.isPasswordInvalid) {
      this.resetPasswordWarning = this.newpasswordInput.errors.errorMessage;
    } else if (this.newpasswordInput.value != this.confirmpasswordInput.value) {
      this.resetPasswordWarning = 'Password does not match.';
    } else {
      this.resetPasswordWarning = null;
      
      if (this.newpasswordInput.errors.isPasswordInvalid == false 
        && this.resetPasswordWarning == null) {
        // update your new user here
        const newpass = {
          'userId': this.userId,
          'userPassword': this.newpasswordInput.value
        }
        this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/confirm-new-password', JSON.stringify(newpass))
          .subscribe(response => {
            if (response['message']=='User Updated') {
              alert('User password successfully updated!');
              localStorage.clear();
              localStorage.setItem('session', JSON.stringify(this.user_session));  
              console.log(this.user_session);
              this.router.navigate(["menu/dashboard"]);   
            }
             
          });
      } else {
        alert('fix your password first');
      }
    }    
  }

  resetWarningMessage () {
    this.warning = null;
  }

  resetWarningMessageInReset () {
    this.resetPasswordWarning = null;
  }
}
