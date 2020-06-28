import { UserStatus } from 'src/app/interface/user.interface';
import { UserInterface, UserRole } from './../../interface/user.interface';
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

  constructor(private userSerive: UserService, private auth: AuthService) { 
  }

  statusChanged() {
    console.log('test');
  }

  deleteUser () {
    if (confirm('Are you sure you want to save this user?')) {
      // this.us.deleteUser({userId: })
    }
  }

  goToViewAll() {
    this.loading = true;
    if (this.userSession.userRole == UserRole.SuperAdmin) {
      // get all users from all location
      this.userSerive.getAllUsersFromAllLocation().then(response => {
        if (response['data'] != undefined) {
          this.userSerive.changeUsers(response['data']);
        } else {
          this.userSerive.changeUsers(null);
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    } else {
      // get all users from this location
      this.userSerive.getAllUsersFromThisLocation(this.userSession.userLocId).then(response => {
        if (response['data'] != undefined) {
          this.userSerive.changeUsers(response['data']);
        } else {
          this.userSerive.changeUsers(null);
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });;
    }
  }

  ngOnInit(): void {
    this.userSerive.currentUsers.subscribe(users => this.users = users);
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


