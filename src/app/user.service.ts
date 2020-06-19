import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new BehaviorSubject<any>(null);
  currentUsers = this.users.asObservable();

  constructor(private http: HttpClient) {
    // this.populateUsers();
    this.getAllUsers();
  }

  // changeMenuSelected (selected: string) {
  //   this.users.next(selected);
  // }

  getAllUsers() {
    // this.http.get('http://localhost/pharmtech/userViewAll.php').
    //   subscribe(response => {
    //     // console.log(response);
    //     this.users.next(response);
    //   });
    this.http.get('http://localhost/pharmtech/api/sample/read.php?').
    subscribe(response => {
      if (response['data'] != undefined) {
        this.users.next(response['data']);
      } else {
        this.users.next(null);
      }
      
    });
  }  
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
