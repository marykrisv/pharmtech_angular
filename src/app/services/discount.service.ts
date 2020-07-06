import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  async viewAllDiscount () {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/discount/view-all-discount.php').toPromise();
  }

  async createNewDiscount(discount: any) {
    return await this.http.post('http://'+ToolConfig.url+'/pharmtech/api/discount/create-discount', 
    JSON.stringify(discount)).toPromise();
  }

  async viewDiscountDetail (disId: number) {
    return await this.http.get('http://'+ToolConfig.url+'/pharmtech/api/discount/view-discount-detail.php?id='+disId).toPromise();
  }

  async updateDiscount(discount: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/discount/update-discount', 
    JSON.stringify(discount)).toPromise();
  }

  async deleteDiscount(discount: any) {
    return await this.http.put('http://'+ToolConfig.url+'/pharmtech/api/discount/delete-discount', 
    JSON.stringify(discount)).toPromise();
  }
}
