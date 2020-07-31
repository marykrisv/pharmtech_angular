import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToolConfig } from '../common/toolconfig';
import { HttpClient } from '@angular/common/http';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ConcentrationService extends DbService {

  apiUrl = "/pharmtech/api/concentration/";

  ngOnInit () {
    super.setApiUrl(this.apiUrl);
  }
  
}
