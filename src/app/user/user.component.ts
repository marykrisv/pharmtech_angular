import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userMenu: string;
  users: any;

  constructor(private us: UserService) { 
    this.goToViewAll();
    this.userMenu = 'viewAll';
  }

  selectUserMenu(selected) {
    this.userMenu = selected;
  }

  goToViewAll() {
    this.us.currentUsers.subscribe(users => this.users = users);   
  }

  ngOnInit(): void {
    // this.us.changeMenuSelected(selected);
    // this.us.currentUsers.subscribe(users => this.users = users)
  }

}

interface User {
  userId: number,
  userName: string,
  userPassword: string,
  userFname: string,
  userMname: string,
  userLname: string,
  userGender: string,
  userBirthdate: Date,
  userAddress: string,
  userCitizenship: string,
  userContactNo: string,
  userRole: string,
  userLicenseNo: string,
  userStatus: number,
  userIsLocked: boolean,
  userIsNew: boolean,
  userLocId: number
  userCreatedOn: Date,
  userCreatedBy: number,
  userModifiedOn: Date,
  userModifiedBy: number
}