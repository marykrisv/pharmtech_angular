import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class DrugallergyService {

  constructor(private http: HttpClient) { }

  async viewAllDrugallergy () {
    console.log('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/view-all-drugallergy.php');
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/view-all-drugallergy.php').toPromise();
  }

  async createNewDrugclass(drugclass: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/create-drugclass', 
    JSON.stringify(drugclass)).toPromise();
  }

  async createNewDrugallergy(drugallergy: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/create-drugallergy', 
    JSON.stringify(drugallergy)).toPromise();
  }

  async viewDrugallergyDetail (drugId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/view-drugallergy-detail.php?id='+drugId).toPromise();
  }

  async updateDrugallergy(drugallergy: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/update-drugallergy', 
    JSON.stringify(drugallergy)).toPromise();
  }

  async deleteDrugallergy(drugallergy: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/drugallergy/delete-drugallergy', 
    JSON.stringify(drugallergy)).toPromise();
  }
}
