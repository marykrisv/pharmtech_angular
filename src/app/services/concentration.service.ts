import { Injectable } from '@angular/core';
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
