import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Privilege } from '../interface/privilege.interface';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryGuard implements CanActivate {
  currentPrivilege: Privilege;
    
  constructor (private router: Router, private data: DataService) {
    this.data.currentUserPrivilege.subscribe(currentUserPrivilege => 
      this.currentPrivilege = currentUserPrivilege);
  }
  
  canActivate(): boolean {
    if (this.currentPrivilege.priInventory) {
      return true;
    } else {
      return false;
    }
  }
  
}
