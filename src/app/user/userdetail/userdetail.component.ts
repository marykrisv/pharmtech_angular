import { ErrorHandling } from './../../common/error-handling';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionInterface } from 'src/app/interface/session.interface';
import { UserInterface, UserStatus } from 'src/app/interface/user.interface';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { PhoneValidator } from 'src/app/validators/phone.validator';
import { PrivilegeInterface } from 'src/app/interface/privilege.interface';
import { RoleConfig } from 'src/app/common/roleconfig';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  constructor(
    private auth: AuthService, 
    private userService: UserService,
    private privilegeService: PrivilegeService,
    private route: ActivatedRoute,
    private router: Router) { }

  userId
  userSession: SessionInterface;
  userDetail: UserInterface = null;
  currentStat: string;

  temporaryPass: string;
  genUsername: string = null;

  //adding status
  stillUpdatingUser: boolean = false;
  stillDeletingUser: boolean = false;

  updated: boolean = false;

  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPassword: new FormControl({value: '', disabled: true}, Validators.required),
    userFname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userMname: new FormControl('', Validators.minLength(2)),
    userLname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userGender: new FormControl('', Validators.required),
    userBirthdate: new FormControl('', Validators.required),
    userAddress: new FormControl('', Validators.required),
    userCitizenship: new FormControl('', Validators.required),
    userContactNo: new FormControl('', PhoneValidator.isPhoneInvalid), //fix later
    userRole: new FormControl('', Validators.required),
    userLicenseNo: new FormControl('')
  });

  statusForm = new FormGroup({
    userStatus: new FormControl('')
  });

  privilegeForm = new FormGroup({
    priDashboard: new FormControl(false, Validators.required),
    priUser: new FormControl(false, Validators.required),
    priInventory: new FormControl(false, Validators.required),
    priManage: new FormControl(false, Validators.required),
    priPatientManagement: new FormControl(false, Validators.required),
    priPharmacyCorner: new FormControl(false, Validators.required),
    priNotification: new FormControl(false, Validators.required),
    priPos: new FormControl(false, Validators.required)
  });

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => this.userSession = currentSession);

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });

    this.populateDetails();
    // this.auth.currentSession.subscribe(currentSession => this.userSession = currentSession);
    // this.setRandomPassword();
  }

  initializeFormValue() {
    if (this.userDetail != null) {
      // populate user detail
      this.userNameInput.setValue(this.userDetail.userName);
      this.userFnameInput.setValue(this.userDetail.userFname);
      this.userMnameInput.setValue(this.userDetail.userMname);
      this.userLnameInput.setValue(this.userDetail.userLname);
      this.userGenderInput.setValue(this.userDetail.userGender);
      this.userBirthdateInput.setValue(this.userDetail.userBirthdate);
      this.userAddressInput.setValue(this.userDetail.userAddress);
      this.userCitizenshipInput.setValue(this.userDetail.userCitizenship);
      this.userContactNoInput.setValue(this.userDetail.userContactNo);
      this.userRoleInput.setValue(this.userDetail.userRole);
      this.userLicenseNoInput.setValue(this.userDetail.userLicenseNo);

      // populate user privilege
      this.priDashboardInput.setValue(+this.userDetail.priDashboard);
      this.priUserInput.setValue(+this.userDetail.priUser);
      this.priInventoryInput.setValue(+this.userDetail.priInventory);
      this.priManageInput.setValue(+this.userDetail.priManage);
      this.priPatientManagementInput.setValue(+this.userDetail.priPatientManagement);
      this.priPharmacyCornerInput.setValue(+this.userDetail.priPharmacyCorner);
      this.priNotificationInput.setValue(+this.userDetail.priNotification);
      this.priPosInput.setValue(+this.userDetail.priPos);
    }

    this.currentStat = this.userDetail.userStatus;
    this.userStatusIput.setValue(this.userDetail.userStatus);
  }

  back() {
    if ((this.userForm.touched || this.privilegeForm.dirty) && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/users']);
      }
    } else {
      this.router.navigate(['/menu/users']);
    }
  }

  resetPassword() {
    if (confirm('Are you sure you want to reset user password?')) {
      this.setRandomPassword();
      const user = {
        userId: this.userDetail.userId,
        userPassword: this.temporaryPass,
        userModifiedOn: new Date(),
        userModifiedBy: this.userSession.userId
      }
      this.userService.resetPassword(user).then(response => {
        if (response['success'] == true) {
          this.userPasswordInput.setValue(this.temporaryPass);
          alert(response['message']);
        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert(ErrorHandling.showError(response));
      });
    }
  }

  changeStatus () {
    var stat = this.userStatusIput.value;
    if (confirm('Are you sure you want to change user to '+stat+'?')) {
      //change user status
      const user = {
        userId: this.userDetail.userId,
        userStatus: this.userStatusIput.value,
        userModifiedOn: new Date(),
        userModifiedBy: this.userSession.userId
      }

      this.userService.changeUserStatus(user).then(response => {
        if (response['success'] == false) {
          this.userStatusIput.setValue(this.currentStat);
          alert(ErrorHandling.showError(response));
        } else {
          alert(response['message']);
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    } else {
      this.userStatusIput.setValue(this.currentStat);
    }
  }

  populateDetails () {    
    this.userService.viewUserDetail(this.userId, this.userSession.userLocId).then(response => {
      if(response['data'] != null) {
        this.userDetail = <UserInterface>response['data'][0];

        this.initializeFormValue();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  deleteUser () {
    if (confirm('Are you sure you want to delete this user?')) {
      const user = {
        userId: this.userDetail.userId,
        userModifiedOn: new Date(),
        userModifiedBy: this.userSession.userId
      }
      this.userService.deleteUser(user).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["menu/users"]);  
        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  // set privilege based on role
  setPrivilegeBasedOnRole () {
    var role = this.userRoleInput.value.toString().trim();
    if (role == '') {
      this.priDashboardInput.setValue(false);
      this.priUserInput.setValue(false);
      this.priInventoryInput.setValue(false);
      this.priManageInput.setValue(false);
      this.priPatientManagementInput.setValue(false);
      this.priPharmacyCornerInput.setValue(false);
      this.priNotificationInput.setValue(false);
      this.priPosInput.setValue(false);
    } else {
      var privilege: PrivilegeInterface = RoleConfig.role[role];

      this.priDashboardInput.setValue(privilege.priDashboard);
      this.priUserInput.setValue(privilege.priUser);
      this.priInventoryInput.setValue(privilege.priInventory);
      this.priManageInput.setValue(privilege.priManage);
      this.priPatientManagementInput.setValue(privilege.priPatientManagement);
      this.priPharmacyCornerInput.setValue(privilege.priPharmacyCorner);
      this.priNotificationInput.setValue(privilege.priNotification);
      this.priPosInput.setValue(privilege.priPos);
    }
  }

  //set random password
  setRandomPassword () {
    this.temporaryPass = (Math.random().toString(36).slice(2)).substring(0,6);
  }

  //set username
  generateUserName() {
    var lname = this.userLnameInput.value.toString().trim().toLowerCase();
    var fname = this.userFnameInput.value.toString().trim().toLowerCase().substring(0,2);
    var bday = this.userBirthdateInput.value.toString().trim();
    var month = bday.substring(5,7);
    var day = bday.substring(8,10);    
    var role = this.userRoleInput.value.toString().trim().toLowerCase().substring(0,2);
    
    if (lname != '' && fname != '' && month != '' && day != '' && role != '') {
      this.genUsername = lname+'.'+fname+'_'+role+month+day;
      this.userNameInput.setValue(this.genUsername);
    }
  }

  updatedUser() {
    if (confirm('Are you sure you want to update this user?')) {
      this.stillUpdatingUser = true;

      //add user
      var userData: any;
      userData = {
        userId: this.userDetail.userId,
        userName: this.userNameInput.value,
        userFname: this.userFnameInput.value,
        userMname: this.userMnameInput.value,
        userLname: this.userLnameInput.value,
        userGender: this.userGenderInput.value,
        userBirthdate: this.userBirthdateInput.value,
        userAddress: this.userAddressInput.value,
        userCitizenship: this.userCitizenshipInput.value,
        userContactNo: this.userContactNoInput.value,
        userRole: this.userRoleInput.value,
        userLicenseNo: this.userLicenseNoInput.value,        
        userLocId: 1,
        userModifiedBy: this.userSession.userId,
        userModifiedOn: new Date()
      }
      
      this.userService.updateUserInformation(userData).then(
        response => {
          if (response != null) {
            if (response['success'] == true) {          
              this.updatePrivilege(this.userDetail.userId);
            } else {
              var errorcode = response['errorCode'];
              if (errorcode != '03') {
                alert(ErrorHandling.showError(response));
              } else {
                this.updatePrivilege(this.userDetail.userId);
              }
            }
          } else {
            alert(ErrorHandling.showError(response));
          }
        }
      ).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {        
        this.stillUpdatingUser = false;
      });    
    } 
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      // clear all value in information
      this.userNameInput.setValue('');
      this.userFnameInput.setValue('');
      this.userMnameInput.setValue('');
      this.userLnameInput.setValue('');
      this.userGenderInput.setValue('');
      this.userBirthdateInput.setValue('');
      this.userAddressInput.setValue('');
      this.userCitizenshipInput.setValue('');
      this.userContactNoInput.setValue('');
      this.userRoleInput.setValue('');
      this.userLicenseNoInput.setValue('');

      // clear all privilege
      this.priDashboardInput.setValue('');
      this.priUserInput.setValue('');
      this.priInventoryInput.setValue('');
      this.priManageInput.setValue('');
      this.priPatientManagementInput.setValue('');
      this.priPharmacyCornerInput.setValue('');
      this.priNotificationInput.setValue('');
      this.priPosInput.setValue('');

      //set generated username to null
      this.genUsername = null;
    } else {
      // Do nothing!
    }
  }

  updatePrivilege(userId:number) {
    //create privilege
    var privilege: PrivilegeInterface;
    privilege = {
      priUserId: userId,
      priDashboard: this.priDashboardInput.value,
      priUser: this.priUserInput.value,
      priInventory: this.priInventoryInput.value,
      priManage: this.priManageInput.value,
      priPatientManagement: this.priPatientManagementInput.value,
      priPharmacyCorner: this.priPharmacyCornerInput.value,
      priNotification: this.priNotificationInput.value,
      priPos: this.priPosInput.value
    }

    this.privilegeService.updatePrivilege(privilege).then(
      response => {
        if (response['success'] == true) {
          alert('User successfully updated!');

          this.updated = true;
        } else {
          var errorcode = response['errorCode'];
          if (errorcode != '03') {
            alert(ErrorHandling.showError(response));
          } else {
            alert('User successfully updated!');

            this.updated = true;
          }
        }
      }      
    ).catch(response => {
      alert("Connection Problem. Please check your internet.");
    }).finally(() => {        
      this.stillUpdatingUser = false;
    });
  }

  backToTop () {
    document.getElementById('top').scrollIntoView();
  }

  
  get userNameInput () {
    return this.userForm.get('userName');
  }

  get userPasswordInput () {
    return this.userForm.get('userPassword');
  }

  get userFnameInput () {
    return this.userForm.get('userFname');
  }

  get userMnameInput () {
    return this.userForm.get('userMname');
  }

  get userLnameInput () {
    return this.userForm.get('userLname');
  }

  get userGenderInput () {
    return this.userForm.get('userGender');
  }

  get userBirthdateInput () {
    return this.userForm.get('userBirthdate');
  }

  get userAddressInput () {
    return this.userForm.get('userAddress');
  }

  get userCitizenshipInput () {
    return this.userForm.get('userCitizenship');
  }

  get userContactNoInput () {
    return this.userForm.get('userContactNo');
  }

  get userRoleInput () {
    return this.userForm.get('userRole');
  }

  get userLicenseNoInput () {
    return this.userForm.get('userLicenseNo');
  }

  get priDashboardInput () {
    return this.privilegeForm.get('priDashboard');
  }

  get priUserInput () {
    return this.privilegeForm.get('priUser');
  }

  get priInventoryInput () {
    return this.privilegeForm.get('priInventory');
  }

  get priManageInput () {
    return this.privilegeForm.get('priManage');
  }

  get priPatientManagementInput () {
    return this.privilegeForm.get('priPatientManagement');
  }

  get priPharmacyCornerInput () {
    return this.privilegeForm.get('priPharmacyCorner');
  }

  get priNotificationInput () {
    return this.privilegeForm.get('priNotification');
  }

  get priPosInput () {
    return this.privilegeForm.get('priPos');
  }  

  get userStatusIput () {
    return this.statusForm.get('userStatus');
  }
}
