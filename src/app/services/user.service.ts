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

  async viewByRoleOneLocation (locId: number, role: string) {
    console.log('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-role-one-location.php?locid='
    +locId+'&role='+role);
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-role-one-location.php?locid='
    +locId+'&role='+role).toPromise();
  }

  async searchUserOneLocation (locId: number, searchBy: string, search: string) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-search-one-location?locid='
    +locId+'&searchBy='+searchBy+'&search='+search).toPromise();
  }

  async searchUserAllLocation (locId: number, searchBy: string, search: string) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-by-search-all-location?locid='
    +locId+'&searchBy='+searchBy+'&search='+search).toPromise();
  }

  async createNewUser(user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/create-new-user', 
    JSON.stringify(user)).toPromise();
  }

  async getAllUsersFromThisLocation(locId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-all-from-one-location.php?locid='+locId)
    .toPromise();
  }

  async getAllUsersFromAllLocation() {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-all-from-all-location.php')
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

  async viewUserDetail (userId, locId) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/user/view-user-detail.php?id='
    +userId+'&locid='+locId).toPromise();
  }

  async deleteUser (user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/delete-user.php', 
    JSON.stringify(user)).toPromise();
  }

  async changeUserStatus (user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/update-status.php', 
    JSON.stringify(user)).toPromise();
  }

  async resetPassword (user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/user/reset-user-password.php', 
    JSON.stringify(user)).toPromise();
  }

}