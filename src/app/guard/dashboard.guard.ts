import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { PrivilegeInterface } from '../interface/privilege.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  currentPrivilege: PrivilegeInterface;
    
  constructor (private router: Router, private data: DataService) {
    this.data.currentUserPrivilege.subscribe(currentUserPrivilege => 
      this.currentPrivilege = currentUserPrivilege);
  }
  
  canActivate(): boolean {
    if (this.currentPrivilege.priDashboard) {
      return true;
    } else {
      return false;
    }
  }
  
}
