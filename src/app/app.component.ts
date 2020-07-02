import { SessionInterface } from './interface/session.interface';
import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { PrivilegeService } from './services/privilege.service';
import { PrivilegeInterface } from './interface/privilege.interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pharmtech';
  user_session: SessionInterface;

  constructor(private auth: AuthService, 
              private privilegeService: PrivilegeService,
              private data: DataService,
              private router: Router) {
  }

  ngOnInit(): void {   
    this.auth.currentSession.subscribe(
      usersession => this.user_session = usersession
    );

    //check if in session
    if (localStorage.getItem('session') == null) {
      // do nothing
    } else {
      //get localStorage sesson and set as currentSession
      let sessionObj: any = JSON.parse(localStorage.getItem('session')); // string to generic object first
      let session: SessionInterface = <SessionInterface>sessionObj;

      let privilegeObj: any = JSON.parse(localStorage.getItem('privilege')); // string to generic object first
      let privilege: PrivilegeInterface = <PrivilegeInterface>privilegeObj;

      this.auth.changeSession(session);
      this.data.changePrivilege(privilege);

      //to be used for checking the privilege for the guard
      this.setPrivilege();    
    }
  }

  setPrivilege () {
    this.privilegeService.getPrivilege({priUserId: this.user_session.userId}).then(
      response => {
        const privilege = {
          priDashboard: response['data'][0]['priDashboard'],
          priUser: response['data'][0]['priUser'],
          priInventory: response['data'][0]['priInventory'],
          priManage: response['data'][0]['priManage'],
          priPatientManagement: response['data'][0]['priPatientManagement'],
          priPharmacyCorner: response['data'][0]['priPharmacyCorner'],
          priNotification: response['data'][0]['priNotification'],
          priPos: response['data'][0]['priPos']
        }
    
        this.data.changePrivilege(privilege);
        localStorage.setItem('privilege', JSON.stringify(privilege));
      
        this.router.navigate(["menu/patient-management"]);  
      }
    ).catch(response => {
      // alert("Connection Problem. Please check your internet.");
    });;
  }
}

document.body.onclick = function(e) {
  
  var element_sidewrapper = document.getElementById("sidebar-wrapper");
  var element_wrapper = document.getElementById("wrapper");
  var element_dropdown = document.getElementById("dropdownMenu");
  var screenWidth = window.innerWidth;
  if (screenWidth <= 767) {
    if(e.target != element_sidewrapper) {
      //outside      
      if (!element_wrapper.classList.contains("active")) {
        element_wrapper.classList.toggle("active");        
      }       
    } else {
      //inside
        // alert('You clicked inside');
    }
  }
  if (element_dropdown != null) {
    if (e.target != element_dropdown) {
      //outside      
      if (!element_dropdown.classList.contains("collapse")) {
        element_dropdown.classList.toggle("collapse");        
      } 
    }
  } 
  
}
