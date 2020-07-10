import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  apiUrl = "/pharmtech/api/restriction/";

  constructor(private http: HttpClient) { }

  async viewAllRestriction () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-restriction.php')
    .toPromise();
  }

  async createNewRestriction(restriction: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-restriction', 
    JSON.stringify(restriction)).toPromise();
  }

  async viewRestrictionDetail (resId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-restriction-detail.php?id='+resId)
    .toPromise();
  }

  async updateRestriction(restriction: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-restriction', 
    JSON.stringify(restriction)).toPromise();
  }

  async deleteRestriction(restriction: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-restriction', 
    JSON.stringify(restriction)).toPromise();
  }
}
