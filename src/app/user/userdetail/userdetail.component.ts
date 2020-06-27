import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionInterface } from 'src/app/interface/session.interface';
import { UserInterface } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  userId
  userSession: SessionInterface;
  userDetail: UserInterface = null;
  // userDetail: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => this.userSession = currentSession);

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });

    this.displayDetails();
  }

  displayDetails () {
    
    this.userService.viewUserDetail(this.userId, this.userSession.userLocId).then(response => {
      if(response['data'] != null) {
        this.userDetail = <UserInterface>response['data'][0];
      } else {
        alert("Connection Problem. Please check your internet.");
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

}
