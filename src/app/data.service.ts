import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private menuSelected = new BehaviorSubject<string>("users");
  currentMenuSelected = this.menuSelected.asObservable();

  constructor() { }

  changeMenuSelected (selected: string) {
    this.menuSelected.next(selected);
  }
}
