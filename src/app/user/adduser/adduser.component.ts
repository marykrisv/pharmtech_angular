import { Router } from '@angular/router';
import { ErrorHandling } from './../../common/error-handling';
import { RoleConfig } from './../../common/roleconfig';
import { PhoneValidator } from './../../validators/phone.validator';
import { PrivilegeInterface } from './../../interface/privilege.interface';
import { PrivilegeService } from './../../services/privilege.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../auth/auth.service';
import { SessionInterface } from './../../interface/session.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserInterface, UserStatus } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  userSession: SessionInterface;
  temporaryPass: string;
  genUsername: string = null;

  //adding status
  stillCreatingUser: boolean = false;

  added: boolean = false;

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

  constructor(
    private auth: AuthService, 
    private userService: UserService,
    private privilegeService: PrivilegeService,
    private router: Router) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => this.userSession = currentSession);
    this.setRandomPassword();
  }

  back() {
    if ((this.userForm.touched || this.privilegeForm.dirty) && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/users']);
      }
    } else {
      this.router.navigate(['/menu/users']);
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
    this.userPasswordInput.setValue(this.temporaryPass);
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

  addNewUser() {
    if (confirm('Are you sure you want to save this user?')) {
      this.stillCreatingUser = true;

      //add user
      var userData: UserInterface;
      userData = {
        userName: this.userNameInput.value,
        userPassword: this.userPasswordInput.value,
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
        userStatus: UserStatus.Active,
        userIsNew: true,
        userLocId: this.userSession.userLocId,
        userCreatedBy: this.userSession.userId
      }
      
      this.userService.createNewUser(userData).then(
        response => {
          if (response['success'] == true) {          
            this.createPrivilege(response['userId']);
          } else {
            alert(ErrorHandling.showError(response));
          }
        }
      ).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingUser = false;
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

      //clear password
      this.setRandomPassword();

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

  createPrivilege(userId:number) {
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

    this.privilegeService.createPrivilege(privilege).then(
      response => {
        if (response['success'] == true) {
          alert('User successfully added!');

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }
      }      
    ).catch(response => {
      alert(ErrorHandling.showError(response));
    }).finally(() => {
      this.stillCreatingUser = false;
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
}
