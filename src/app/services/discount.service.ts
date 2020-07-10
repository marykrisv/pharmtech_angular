import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  apiUrl = "/pharmtech/api/discount/";

  constructor(private http: HttpClient) { }

  async viewAllDiscount () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-discount.php')
    .toPromise();
  }

  async createNewDiscount(discount: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-discount', 
    JSON.stringify(discount)).toPromise();
  }

  async viewDiscountDetail (disId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-discount-detail.php?id='+disId)
    .toPromise();
  }

  async updateDiscount(discount: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-discount', 
    JSON.stringify(discount)).toPromise();
  }

  async deleteDiscount(discount: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-discount', 
    JSON.stringify(discount)).toPromise();
  }
}
