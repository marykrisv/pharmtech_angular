import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { PrivilegeInterface } from '../interface/privilege.interface';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  currentPrivilege: PrivilegeInterface;
    
  constructor (private router: Router, private data: DataService) {
    this.data.currentUserPrivilege.subscribe(currentUserPrivilege => 
      this.currentPrivilege = currentUserPrivilege);
  }
  
  canActivate(): boolean {
    if (this.currentPrivilege.priUser) {
      return true;
    } else {
      return false;
    }
  }
}
