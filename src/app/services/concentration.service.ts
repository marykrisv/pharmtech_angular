import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationService {

  constructor(private http: HttpClient) { }

  async viewAllConcentration () {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/concentration/view-all-concentration.php').toPromise();
  }

  async createNewConcentration(concentration: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/concentration/create-concentration', 
    JSON.stringify(concentration)).toPromise();
  }
}
