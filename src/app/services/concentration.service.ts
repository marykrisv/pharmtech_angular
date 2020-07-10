import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationService {

  apiUrl = "/pharmtech/api/concentration/";

  constructor(private http: HttpClient) { }

  async viewAllConcentration () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-concentration.php')
    .toPromise();
  }

  async createNewConcentration(concentration: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-concentration', 
    JSON.stringify(concentration))
    .toPromise();
  }

  async viewConcentrationDetail (conId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-concentration-detail.php?id='+conId)
    .toPromise();
  }

  async updateConcentration(concentration: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-concentration', 
    JSON.stringify(concentration))
    .toPromise();
  }

  async deleteConcentration(concentration: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-concentration', 
    JSON.stringify(concentration))
    .toPromise();
  }
}
