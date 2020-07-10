import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  apiUrl = "/pharmtech/api/manufacturer/";

  constructor(private http: HttpClient) { }

  async viewAllManufacturer () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-manufacturer.php')
    .toPromise();
  }

  async createNewManufacturer(manufacturer: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-manufacturer', 
    JSON.stringify(manufacturer)).toPromise();
  }

  async viewManufacturerDetail (manId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-manufacturer-detail.php?id='+manId)
    .toPromise();
  }

  async updateManufacturer(manufacturer: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-manufacturer', 
    JSON.stringify(manufacturer)).toPromise();
  }

  async deleteManufacturer(manufacturer: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-manufacturer', 
    JSON.stringify(manufacturer)).toPromise();
  }
}
