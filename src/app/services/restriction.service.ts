import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestrictionService {

  constructor(private http: HttpClient) { }

  async viewAllRestriction () {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/restriction/view-all-restriction.php').toPromise();
  }

  async createNewRestriction(restriction: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/restriction/create-restriction', 
    JSON.stringify(restriction)).toPromise();
  }

  async viewRestrictionDetail (resId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/restriction/view-restriction-detail.php?id='+resId).toPromise();
  }

  async updateRestriction(restriction: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/restriction/update-restriction', 
    JSON.stringify(restriction)).toPromise();
  }

  async deleteRestriction(restriction: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/restriction/delete-restriction', 
    JSON.stringify(restriction)).toPromise();
  }
}
