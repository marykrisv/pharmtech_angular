import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Privilege } from '../interface/privilege.interface';
import { Session } from '../interface/session.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  screenWidth = window.innerWidth;
  userPrivilege: Privilege;
  userSession: Session;

  constructor(private data: DataService, private auth: AuthService) { }

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
  }

  openSubmenu ($event) {
    $event.stopPropagation();
    var element = document.getElementById("others");
    element.classList.toggle("collapse");
  }
}
