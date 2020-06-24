import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  constructor(private http: HttpClient) { }

  async getPrivilege (user: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/privilege/get-privilege', 
    JSON.stringify(user)).toPromise();
  }
}