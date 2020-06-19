import { Session } from './../interface/session';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user_session: Session;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentSession.subscribe(
      usersession => this.user_session = usersession
    );
  }

  sampleLogin () {
    this.data.changeSession({userId: 1, userName: 'Mary'});
  }
}
