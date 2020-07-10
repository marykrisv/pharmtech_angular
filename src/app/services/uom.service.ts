import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class UomService {

  apiUrl = "/pharmtech/api/uom/";

  constructor(private http: HttpClient) { }

  async viewAllUom () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-uom.php')
    .toPromise();
  }

  async createNewUom(uom: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-uom', 
    JSON.stringify(uom)).toPromise();
  }

  async viewUomDetail (uomId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-uom-detail.php?id='+uomId)
    .toPromise();
  }

  async updateUom(uom: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-uom', 
    JSON.stringify(uom)).toPromise();
  }

  async deleteUom(uom: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/uom/delete-uom', 
    JSON.stringify(uom)).toPromise();
  }
}
