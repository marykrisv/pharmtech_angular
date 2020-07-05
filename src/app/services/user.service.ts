import { ToolConfig } from './../common/toolconfig';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private users = new BehaviorSubject<any>(null);
  // currentUsers = this.users.asObservable();
   // changeUsers (users: any) {
  //   this.users.next(users);
  // }

  constructor(private http: HttpClient) {
  }

  async updateUserInformation (user: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/user/update-user-info.php',
    JSON.stringify(user)).toPromise();
  }

  async viewByStatusAllLocation (locId: number, role: string) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-status-all-location.php?status='
    +role+'&limit='+ToolConfig.limitUsers).toPromise();
  }

  async viewByStatusOneLocation (locId: number, role: string) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-status-one-location.php?locid='
    +locId+'&status='+role+'&limit='+ToolConfig.limitUsers).toPromise();
  }

  async searchUserOneLocation (locId: number, searchBy: string, search: string) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-search-one-location?locid='
    +locId+'&searchBy='+searchBy+'&search='+search+'&limit='+ToolConfig.limitUsers).toPromise();
  }

  async searchUserAllLocation (locId: number, searchBy: string, search: string) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-search-all-location?locid='
    +locId+'&searchBy='+searchBy+'&search='+search+'&limit='+ToolConfig.limitUsers).toPromise();
  }

  async createNewUser(user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/create-user', 
    JSON.stringify(user)).toPromise();
  }

  async getAllUsersFromThisLocation(locId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-all-from-one-location.php?locid='
    +locId+'&limit='+ToolConfig.limitUsers)
    .toPromise();
  }

  async getAllUsersFromAllLocation() {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-all-from-all-location.php?limit='
    +ToolConfig.limitUsers)
    .toPromise();
  }
  
  async login(user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/login', 
    JSON.stringify(user)).toPromise();
  }

  async updatePassword (newpass: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/user/confirm-new-password', 
    JSON.stringify(newpass)).toPromise();
  }

  async viewUserDetail (userId, locId) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-user-detail.php?id='
    +userId).toPromise();
  }

  async deleteUser (user: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/user/delete-user.php', 
    JSON.stringify(user)).toPromise();
  }

  async changeUserStatus (user: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/user/update-status.php', 
    JSON.stringify(user)).toPromise();
  }

  async resetPassword (user: any) {    
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/user/reset-user-password.php', 
    JSON.stringify(user)).toPromise();
  }

}