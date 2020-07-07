import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class StrengthService {

  constructor(private http: HttpClient) { }

  async viewAllStrength () {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/strength/view-all-strength.php').toPromise();
  }

  async createNewStrength(strength: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/strength/create-strength', 
    JSON.stringify(strength)).toPromise();
  }

  async viewStrengthDetail (strId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/strength/view-strength-detail.php?id='+strId).toPromise();
  }

  async updateStrength(strength: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/strength/update-strength', 
    JSON.stringify(strength)).toPromise();
  }

  async deleteStrength(strength: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/strength/delete-strength', 
    JSON.stringify(strength)).toPromise();
  }
}
