import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationService {

  apiUrl = "/pharmtech/api/concentration/";

  constructor(private http: HttpClient) {
  }

  viewAll(): Observable<any> {
    return this.http.get<any>('http://'+ToolConfig.url+this.apiUrl+'view-all-concentration.php')
    .pipe(catchError(this.handleError));
  }

  create(concentration: any): Observable<any> {
    return this.http.post('http://'+ToolConfig.url+this.apiUrl+'create-concentration', 
    JSON.stringify(concentration))
    .pipe(catchError(this.handleError));
  }

  viewDetail(conId: number): Observable<any> {
    return this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-concentration-detail.php?id='+conId)
    .pipe(catchError(this.handleError));
  }

  update(concentration: any): Observable<any> {
    return this.http.put('http://'+ToolConfig.url+this.apiUrl+'update-concentration', 
    JSON.stringify(concentration))
    .pipe(catchError(this.handleError));
  }

  delete(concentration: any): Observable<any> {
    return this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete-concentration', 
    JSON.stringify(concentration))
    .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError("Connection Problem. Please check your internet."); 
  }
}
