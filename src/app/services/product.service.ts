import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolConfig } from '../common/toolconfig';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "/pharmtech/api/product/";

  constructor(private http: HttpClient) { }

  async viewAllProduct () {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-product.php').toPromise();
  }

  async createNewProduct(product: any) {
    return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-product', 
    JSON.stringify(product)).toPromise();
  }

  async viewProductDetail (prodId: number) {
    return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-product-detail.php?id='+prodId).toPromise();
  }

  async updateProduct(product: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-product', 
    JSON.stringify(product)).toPromise();
  }

  async deleteProduct(product: any) {
    return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-product', 
    JSON.stringify(product)).toPromise();
  }
}
