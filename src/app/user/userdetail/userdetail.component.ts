import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from 'src/app/interface/session.interface';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  userId
  userSession: Session;
  userDetail: User = null;
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
        this.userDetail = <User>response['data'][0];
        // console.log(this.userDetail);
        // this.userDetail = {
        //   userName: response['data'][0]['userName'],
        //   userPassword: response['data'][0]['userPassword'],
        //   userFname: response['data'][0]['userFname'],
        //   userMname: response['data'][0]['userMname'],
        //   userLname: response['data'][0]['userLname'],
        //   userGender: response['data'][0]['userGender'],
        //   userBirthdate: response['data'][0]['userBirthdate'],
        //   userAddress: response['data'][0]['userAddress'],
        //   userCitizenship: response['data'][0]['userCitizenship'],
        //   userContactNo: response['data'][0]['userContactNo'],
        //   userRole: response['data'][0]['userRole'],
        //   userLicenseNo: response['data'][0]['userLicenseNo'],
        //   userStatus: response['data'][0]['userStatus'],
        //   userIsLocked: response['data'][0]['userIsLocked'],
        //   userIsNew: response['data'][0]['userIsNew'],
        //   userLocId: response['data'][0]['userLocId'],
        //   userCreatedOn: response['data'][0]['userCreatedOn'],
        //   userCreatedBy: response['data'][0]['userCreatedBy'],
        //   userModifiedOn: response['data'][0]['userModifiedOn'],
        //   userModifiedBy: response['data'][0]['userModifiedBy'],
        // }
      } else {
        alert("Connection Problem. Please check your internet.");
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

}
