import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  apiUrl = "/pharmtech/api/discount/";

  constructor(private http: HttpClient) { }

  viewAll(): Observable<any> {
    return this.http.get<any>('http://'+ToolConfig.url+this.apiUrl+'view-all-discount.php')
    .pipe(catchError(this.handleError));
  }

  create(discount: any): Observable<any> {
    return this.http.post('http://'+ToolConfig.url+this.apiUrl+'creat-discount', 
    JSON.stringify(discount))
    .pipe(catchError(this.handleError));
  }

  viewDetail(conId: number): Observable<any> {
    return this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-discount-detail.php?id='+conId)
    .pipe(catchError(this.handleError));
  }

  update(discount: any): Observable<any> {
    return this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-discount', 
    JSON.stringify(discount))
    .pipe(catchError(this.handleError));
  }

  delete(discount: any): Observable<any> {
    return this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-discount', 
    JSON.stringify(discount))
    .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError("Connection Problem. Please check your internet."); 
  }



  // async viewAllDiscount () {
  //   return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-all-discount.php')
  //   .toPromise();
  // }

  // async createNewDiscount(discount: any) {
  //   return await this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-discount', 
  //   JSON.stringify(discount)).toPromise();
  // }

  // async viewDiscountDetail (disId: number) {
  //   return await this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-discount-detail.php?id='+disId)
  //   .toPromise();
  // }

  // async updateDiscount(discount: any) {
  //   return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-discount', 
  //   JSON.stringify(discount)).toPromise();
  // }

  // async deleteDiscount(discount: any) {
  //   return await this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-discount', 
  //   JSON.stringify(discount)).toPromise();
  // }
}
