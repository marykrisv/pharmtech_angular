import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // users: User[] = new Array();
  users: any;

  getAllUsers(): any {
    this.http.get('http://localhost/pharmtech/userViewAll.php').
      subscribe(response => {
        // console.log(response);
        this.users = response;
        // console.log(this.users);
      });
  }

  constructor(private http: HttpClient) {
    // this.populateUsers();
  }
  

  // getAll(): Observable<User[]> {
    
  // }
}

interface User {
  userId: number,
  username: string,
  userPassword: string,
  userFname: string,
  userMname: string,
  userLname: string,
  // userGender: string,
  // userBirthdate: Date,
  // userAddress: string,
  // userCitizenship: string,
  // userContactNo: string,
  userRole: string,
  // userLicenseNo: string,
  // userStatus: number,
  // userIsLocked: boolean,
  // userIsNew: boolean,
  // userLocId: number
  // userCreatedOn: Date,
  // userCreatedBy: number,
  // userModifiedOn: Date,
  // userModifiedBy: number
}
