import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Session } from '../interface/session';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.scss']
})
export class MenuviewComponent implements OnInit {

  currentSession = null;

  constructor(private data: AuthService, private router: Router) {    
  }

  ngOnInit(): void {
    this.data.currentSession.subscribe(currentSession => this.currentSession = currentSession);
    
    if (this.currentSession != null) {      
      this.router.navigate(["menu/dashboard"]);
    } else {
      //redirect to login
      this.router.navigate(["/login"]);
    }
  }
}
