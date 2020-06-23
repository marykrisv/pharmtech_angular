import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  userMenu: string;
  users: any;

  constructor(private us: UserService) { 
    
  }

  goToViewAll() {
    this.us.getAllUsers(1).then(response => {
      if (response['data'] != undefined) {
        this.us.changeUsers(response['data']);
      } else {
        this.us.changeUsers(null);
      } 
    });
  }

  ngOnInit(): void {
    this.us.currentUsers.subscribe(users => this.users = users);
    this.goToViewAll();
    this.userMenu = 'viewAll';
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
