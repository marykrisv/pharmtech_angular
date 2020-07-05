import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  
  async viewAllLocation () {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/location/view-all-location.php').toPromise();
  }

  async viewLocationDetail (locId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/location/view-location-detail.php?id='+locId).toPromise();
  }

  async createNewLocation(location: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/location/create-location', 
    JSON.stringify(location)).toPromise();
  }
}
