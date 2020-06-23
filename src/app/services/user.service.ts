import { ToolConfig } from './../common/toolconfig';
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
  }

  changeUsers (users: any) {
    this.users.next(users);
  }

  async getAllUsers(locId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-all-from-this-location.php?locid='+locId)
    .toPromise();
  }
  
  async login(user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/login', 
    JSON.stringify(user)).toPromise();
  }

  async updatePassword (newpass: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/confirm-new-password', 
    JSON.stringify(newpass)).toPromise();
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
