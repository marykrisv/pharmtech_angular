import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class DosageService {

  apiUrl = "/pharmtech/api/dosage/";

  constructor(private http: HttpClient) { }

  async viewAllDosage () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-dosage.php').toPromise();
  }

  async createNewDosage(dosage: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-dosage', 
    JSON.stringify(dosage)).toPromise();
  }

  async viewDosageDetail (dosId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-dosage-detail.php?id='+dosId).toPromise();
  }

  async updateDosage(dosage: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-dosage', 
    JSON.stringify(dosage)).toPromise();
  }

  async deleteDosage(dosage: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-dosage', 
    JSON.stringify(dosage)).toPromise();
  }
}
