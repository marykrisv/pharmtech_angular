import { UserService } from './../../services/user.service';
import { PasswordValidator } from './../../validators/password.validator';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Session } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Privilege } from 'src/app/interface/privilege.interface';
import { DataService } from 'src/app/services/data.service';


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
  privilege: Privilege;
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

  constructor(
    private auth: AuthService, 
    private data: DataService,
    private router: Router, 
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.view = 'login';
    this.title = 'Login';

    this.auth.currentSession.subscribe(
      usersession => this.user_session = usersession
    ); 
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

    //put here
    this.userService.login(user).then(
      response => {
        if (response['data'] != null) {
          if (response['data'][0]['userIsLocked'] == '0') {
                   
            //set user session
            this.setUsersession(response);
  
            //set privileges
            this.setPrivileges(response);
  
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
              this.successfulLogin();       
            }
          } else {
            this.warning = 'User is locked. Please contact admin';
          }
        } else {
          this.warning = 'Username or password is incorrect!';
          this.ctr++;
  
          if (this.ctr == this.numberOfTries) {
            alert("lock user");
          }
        }
        
        this.usernameInput.setValue('');
        this.passwordInput.setValue('');
      }
    );
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

        this.userService.updatePassword(newpass).then(response => {
          // successfully changed user password for new user
            if (response['message']=='User Updated') {
              alert('User password successfully updated!');
              this.successfulLogin();
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

  setUsersession (response: any) {
    const usersession = {
      userId: response['data'][0]['userId'],
      userName: response['data'][0]['userName'],
      userFname: response['data'][0]['userFname'],
      userMname: response['data'][0]['userMname'],
      userLname: response['data'][0]['userLname'],
      userLocId: response['data'][0]['userLocId'],
      userLocName: response['data'][0]['locName'],
      userRole: response['data'][0]['userRole']
    };
    this.auth.changeSession(usersession);            
  }

  setPrivileges (response: any) {
    this.privilege = {
      priDashboard: response['data'][0]['priDashboard'],
      priUser: response['data'][0]['priUser'],
      priInventory: response['data'][0]['priInventory'],
      priManage: response['data'][0]['priManage'],
      priPatientManagement: response['data'][0]['priPatientManagement'],
      priPharmacyCorner: response['data'][0]['priPharmacyCorner'],
      priNotification: response['data'][0]['priNotification'],
      priPos: response['data'][0]['priPos']
    }

    this.data.changePrivilege(this.privilege);
  }

  successfulLogin () {
    //set storage
    localStorage.clear();
    localStorage.setItem('session', JSON.stringify(this.user_session));
    localStorage.setItem('privilege', JSON.stringify(this.privilege));

    this.router.navigate(["menu/dashboard"]);    
  }
}