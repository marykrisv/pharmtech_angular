import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class DrugallergyService {

  apiUrl = "/pharmtech/api/drugallergy/";

  constructor(private http: HttpClient) { }

  async viewAllDrugallergy () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-drugallergy.php').toPromise();
  }

  async createNewDrugclass(drugclass: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-drugclass', 
    JSON.stringify(drugclass)).toPromise();
  }

  async createNewDrugallergy(drugallergy: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-drugallergy', 
    JSON.stringify(drugallergy)).toPromise();
  }

  async viewDrugallergyDetail (drugId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-drugallergy-detail.php?id='+drugId).toPromise();
  }

  async updateDrugallergy(drugallergy: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-drugallergy', 
    JSON.stringify(drugallergy)).toPromise();
  }

  async deleteDrugallergy(drugallergy: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-drugallergy', 
    JSON.stringify(drugallergy)).toPromise();
  }
}
