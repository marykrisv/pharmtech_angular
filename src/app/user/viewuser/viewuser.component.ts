import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Session } from 'src/app/interface/session.interface';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  userMenu: string;
  users: any;

  user_session: Session;

  constructor(private us: UserService, private auth: AuthService) { 
  }

  goToViewAll() {
    this.us.getAllUsers(this.user_session.userLocId).then(response => {
      if (response['data'] != undefined) {
        this.us.changeUsers(response['data']);
      } else {
        this.us.changeUsers(null);
      } 
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });;
  }

  ngOnInit(): void {
    this.us.currentUsers.subscribe(users => this.users = users);
    this.auth.currentSession.subscribe(currentSession => {
      this.user_session = currentSession;
    });
    this.goToViewAll();
    this.userMenu = 'viewAll';
  }

}


