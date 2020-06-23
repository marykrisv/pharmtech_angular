import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Session } from '../interface/session.interface';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.scss']
})
export class MenuviewComponent implements OnInit {

  currentSession: Session = null;

  constructor(private data: AuthService, private router: Router) {    
  }

  ngOnInit(): void {
    this.data.currentSession.subscribe(currentSession => this.currentSession = currentSession);
    
    if (this.currentSession != null) {    
      if (this.currentSession.userRole.toLowerCase() == 'admin') {
        //set view to dashboard
        this.router.navigate(["menu/dashboard"]);
      } else {
        this.router.navigate(["menu/patient-management"]);
      }      
    } else {
      //redirect to login
      this.router.navigate(["/login"]);
    }
  }
}
