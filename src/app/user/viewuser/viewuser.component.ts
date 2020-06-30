import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { UserStatus } from 'src/app/interface/user.interface';
import { UserInterface, UserRole } from './../../interface/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  users: UserInterface[];
  userSession: SessionInterface;

  loading: boolean = false;

  options = new FormGroup({
    search: new FormControl(),
    location: new FormControl(),
    status: new FormControl('Active'),
    role: new FormControl('All')
  });

  constructor(private UserService: UserService, private auth: AuthService) { 
  }

  statusChanged() {
  }

  deleteUser (userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      const user = {
        userId: userId,
        userModifiedOn: new Date(),
        userModifiedBy: this.userSession.userId
      }
      this.UserService.deleteUser(user).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(userId);

        } else {
          alert(response['message']);
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (userId) {
    for(let i = 0; i < this.users.length; ++i){
      if (this.users[i].userId === userId) {
          this.users.splice(i,1);
      }
    }
  }

  goToViewAll() {
    this.loading = true;
    if (this.userSession.userRole == UserRole.SuperAdmin) {
      // get all users from all location
      this.UserService.getAllUsersFromAllLocation().then(response => {
        if (response['data'] != undefined) {
          this.UserService.changeUsers(response['data']);
        } else {
          this.UserService.changeUsers(null);
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    } else {
      // get all users from this location
      this.UserService.getAllUsersFromThisLocation(this.userSession.userLocId).then(response => {
        if (response['data'] != undefined) {
          this.UserService.changeUsers(response['data']);
        } else {
          this.UserService.changeUsers(null);
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    }
  }

  ngOnInit(): void {
    this.UserService.currentUsers.subscribe(users => this.users = users);
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

  get searchInput () {
    return this.options.get('search');
  }

  get statusInput () {
    return this.options.get('status');
  }

  get roleInput () {
    return this.options.get('role');
  }
}


