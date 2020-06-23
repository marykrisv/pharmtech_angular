import { DataService } from './../services/data.service';
import { UserService } from '../services/user.service';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Privilege } from '../interface/privilege.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  currentPrivilege: Privilege;
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private user: UserService, 
              private router: Router,
              private data: DataService
  ) {  }

  ngOnInit(): void {
    this.data.currentUserPrivilege.subscribe(currentUserPrivilege => this.currentPrivilege = currentUserPrivilege);
  }

  canDashboard(): boolean {
    if (this.currentPrivilege.priDashboard) {
      return true;
    } else {
      return false;
    }
  }

  canUser(): boolean {
    if (this.currentPrivilege.priUser) {
      return true;
    } else {
      return false;
    }
  } 

  canInventory(): boolean {
    if (this.currentPrivilege.priInventory) {
      return true;
    } else {
      return false;
    }
  } 

  canManage(): boolean {
    if (this.currentPrivilege.priManage) {
      return true;
    } else {
      return false;
    }
  } 

  canPatientManagement(): boolean {
    if (this.currentPrivilege.priPatientManagement) {
      return true;
    } else {
      return false;
    }
  } 

  canPharmacy(): boolean {
    if (this.currentPrivilege.priPharmacyCorner) {
      return true;
    } else {
      return false;
    }
  } 

  canNotification(): boolean {
    if (this.currentPrivilege.priNotification) {
      return true;
    } else {
      return false;
    }
  } 

  canPos(): boolean {
    if (this.currentPrivilege.priPos) {
      return true;
    } else {
      return false;
    }
  } 

  canActivate(): boolean {
    if (this.user.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
