import { DbService } from './db.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService extends DbService {

  apiUrl = "/pharmtech/api/discount/";

  ngOnInit () {
    super.setApiUrl(this.apiUrl);
  }

}
