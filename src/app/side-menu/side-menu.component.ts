import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { PrivilegeInterface } from '../interface/privilege.interface';
import { SessionInterface } from '../interface/session.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  screenWidth = window.innerWidth;
  userPrivilege: PrivilegeInterface;
  userSession: SessionInterface;

  isManage: boolean = false;

  constructor(
    private data: DataService, 
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.data.currentUserPrivilege.subscribe(currentUserPrivilege => 
      this.userPrivilege = currentUserPrivilege
    );

    this.auth.currentSession.subscribe(currentSession => 
      this.userSession = currentSession
    );

    //hide dashboard
    // if (this.userSession.userRole.toLowerCase() != 'admin'
    // && this.userPrivilege.priDashboard == false) {
      //set view to dashboard
    //   var element = document.getElementById('menu-content').getElementsByTagName("li");
    //   element[0].classList.add("hidden");
    // } 

    // console.log(this.router.url);
  }

  openSubmenu ($event) {
    $event.stopPropagation();
    var element = document.getElementById("others");
    element.classList.toggle("collapse");
  }
}
