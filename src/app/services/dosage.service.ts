import { DbService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DosageService extends DbService {

  apiUrl = "/pharmtech/api/dosage/";

  ngOnInit () {
    super.setApiUrl(this.apiUrl);
  }
}
