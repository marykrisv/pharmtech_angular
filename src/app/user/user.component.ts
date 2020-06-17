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

  constructor(private http: HttpClient) { 
    this.goToViewAll();
  }

  getUsers(): any {
    // console.log(this.users);
    // this.http.get('http://jsonplaceholder.typicode.com/posts').
    //   subscribe(response => {
    //     console.log(response);
    //   });

      return this.http.get('http://localhost/pharmtech/userViewAll.php').
      subscribe(response => {
        this.users = response;
      });
  }

  goToAddView() {
    this.userMenu = 'add';
  }

  goToViewAll() {
    // let userService = new UserService();

    // this.users = userService.getAllUsers();

    this.getUsers();

    this.userMenu = 'viewAll';
  }

  ngOnInit(): void {
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