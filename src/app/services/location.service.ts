import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiUrl = "/pharmtech/api/location/";

  constructor(private http: HttpClient) { }
  
  async viewAllLocation () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-location.php').toPromise();
  }

  async viewLocationDetail (locId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-location-detail.php?id='+locId).toPromise();
  }

  async createNewLocation(location: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-location', 
    JSON.stringify(location)).toPromise();
  }

  async updateLocation(location: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-location', 
    JSON.stringify(location)).toPromise();
  }

  async deleteLocation(location: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-location', 
    JSON.stringify(location)).toPromise();
  }
}
