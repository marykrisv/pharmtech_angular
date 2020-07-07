import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) { }

  async viewAllManufacturer () {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/manufacturer/view-all-manufacturer.php').toPromise();
  }

  async createNewManufacturer(manufacturer: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/manufacturer/create-manufacturer', 
    JSON.stringify(manufacturer)).toPromise();
  }

  async viewManufacturerDetail (manId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/manufacturer/view-manufacturer-detail.php?id='+manId).toPromise();
  }

  async updateManufacturer(manufacturer: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/manufacturer/update-manufacturer', 
    JSON.stringify(manufacturer)).toPromise();
  }

  async deleteManufacturer(manufacturer: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/manufacturer/delete-manufacturer', 
    JSON.stringify(manufacturer)).toPromise();
  }
}
