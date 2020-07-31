import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  apiUrl;

  constructor(private http: HttpClient) { }

  viewAll(): Observable<any> {
    return this.http.get<any>('http://'+ToolConfig.url+this.apiUrl+'view-all.php')
    .pipe(catchError(this.handleError));
  }

  create(concentration: any): Observable<any> {
    return this.http.post('http://'+ToolConfig.url+this.apiUrl+'create', 
    JSON.stringify(concentration))
    .pipe(catchError(this.handleError));
  }

  viewDetail(conId: number): Observable<any> {
    return this.http.get('http://'+ToolConfig.url+this.apiUrl+'view-detail.php?id='+conId)
    .pipe(catchError(this.handleError));
  }

  update(concentration: any): Observable<any> {
    return this.http.put('http://'+ToolConfig.url+this.apiUrl+'update', 
    JSON.stringify(concentration))
    .pipe(catchError(this.handleError));
  }

  delete(concentration: any): Observable<any> {
    return this.http.put('http://'+ToolConfig.url+this.apiUrl+'delete', 
    JSON.stringify(concentration))
    .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError("Connection Problem. Please check your internet."); 
  }

  setApiUrl(url: string) {
    this.apiUrl = url;
  }
  
}
