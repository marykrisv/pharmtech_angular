import { UserInterface } from './../../interface/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SessionInterface } from 'src/app/interface/session.interface';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  users: UserInterface;
  userSession: SessionInterface;

  loading: boolean = false;

  constructor(private us: UserService, private auth: AuthService) { 
  }

  goToViewAll() {
    this.loading = true;
    if (this.userSession.userRole == 'Super Admin') {
      // get all users from all location
      this.us.getAllUsersFromAllLocation().then(response => {
        if (response['data'] != undefined) {
          this.us.changeUsers(response['data']);
        } else {
          this.us.changeUsers(null);
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    } else {
      // get all users from this location
      this.us.getAllUsersFromThisLocation(this.userSession.userLocId).then(response => {
        if (response['data'] != undefined) {
          this.us.changeUsers(response['data']);
        } else {
          this.us.changeUsers(null);
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });;
    }
  }

  ngOnInit(): void {
    this.us.currentUsers.subscribe(users => this.users = users);
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });
    this.goToViewAll();
  }

  calculateAge (birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}


