import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { UserStatus } from 'src/app/interface/user.interface';
import { UserInterface, UserRole } from './../../interface/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { SearchUserValidator } from 'src/app/validators/search-user.validator';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  users: UserInterface[];
  userSession: SessionInterface;

  loading: boolean = false;

  filterBy: string = "";
  userSearchInput: string = null;

  filterByList = [
    {
      filterString: 'Username: ',
      sqlSearch: 'userName'
    },
    {
      filterString: 'First Name: ',
      sqlSearch: 'userFname'
    },
    {
      filterString: 'Middle Name: ',
      sqlSearch: 'userMname'
    },
    {
      filterString: 'Last Name: ',
      sqlSearch: 'userLname'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy, SearchUserValidator.isSearchUserInvalid),
    location: new FormControl(),
    status: new FormControl('All'),
    role: new FormControl('All')
  });

  constructor(private UserService: UserService, private auth: AuthService) { 
  }

  filterByRole() {
    var role = this.roleInput.value;
    if (role == 'All') {
      //do nothing for now
    } else {
      this.UserService.viewByRoleOneLocation(this.userSession.userLocId, role).then(response => {
        console.log(response);
        if (response['data'] != undefined) {
          this.users = <UserInterface[]>response['data'];
        } else {
          this.users = null;
        } 
      }).catch(response=> {
        alert("Error. Connection Problem!");
      });
    }
  }

  changeFilterBy (filterBy: string) {
    var prevFilterBy = this.filterBy;
    this.filterBy = filterBy+": ";
    if (this.searchInput.invalid) {
      this.searchInput.setValue(this.filterBy);
    } else {
      this.userSearchInput = this.searchInput.value.toString().trim();
      this.userSearchInput = this.userSearchInput.substr(prevFilterBy.length, this.userSearchInput.length);

      if (this.userSearchInput != null) {
        this.searchInput.setValue(this.filterBy+this.userSearchInput);
      }
    }   
  }

  removeFilter() {
    this.userSearchInput = null;
    this.filterBy = "";
    this.searchInput.setValue(this.filterBy);
    this.goToViewAll();
  }

  search() {
    if (this.searchInput.invalid) {
      alert("Fix search text first");
    } else {
      this.userSearchInput = this.searchInput.value.toString().trim();
      this.userSearchInput = this.userSearchInput.substr(this.filterBy.length, this.userSearchInput.length);

      if (this.userSearchInput.trim() != '' && this.userSearchInput != null && this.userSearchInput != '') {
        //search here
        var searchBy: string;
        for (var i = 0; i < this.filterByList.length; i++) {
          if (this.filterByList[i].filterString == this.filterBy) {
            searchBy = this.filterByList[i].sqlSearch;
          }
        }

        if (this.userSession.userRole == UserRole.SuperAdmin) {
          this.UserService.searchUserAllLocation(this.userSession.userLocId, searchBy, this.userSearchInput).then(response=> {
            if (response['data'] != undefined) {
              this.users = <UserInterface[]>response['data'];
            } else {
              this.users = null;
            } 
          }).catch(response=> {
            alert("Error. Connection Problem!");
          });
        } else {
          this.UserService.searchUserOneLocation(this.userSession.userLocId, searchBy, this.userSearchInput).then(response=> {
            if (response['data'] != undefined) {
              this.users = <UserInterface[]>response['data'];
            } else {
              this.users = null;
            } 
          }).catch(response=> {
            alert("Error. Connection Problem!");
          });
        }
      }
    }
  }

  deleteUser (userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      const user = {
        userId: userId,
        userModifiedOn: new Date(),
        userModifiedBy: this.userSession.userId
      }
      this.UserService.deleteUser(user).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(userId);

        } else {
          alert(response['message']);
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (userId) {
    for(let i = 0; i < this.users.length; ++i){
      if (this.users[i].userId === userId) {
          this.users.splice(i,1);
      }
    }
  }

  goToViewAll() {
    this.loading = true;
    if (this.userSession.userRole == UserRole.SuperAdmin) {
      // get all users from all location
      this.UserService.getAllUsersFromAllLocation().then(response => {
        if (response['data'] != undefined) {
          this.users = <UserInterface[]>response['data'];
        } else {
          this.users = null;
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    } else {
      // get all users from this location
      this.UserService.getAllUsersFromThisLocation(this.userSession.userLocId).then(response => {
        if (response['data'] != undefined) {
          this.users = <UserInterface[]>response['data'];
        } else {
          this.users = null;
        } 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    }
  }

  ngOnInit(): void {
    // this.UserService.currentUsers.subscribe(users => this.users = users);
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });
    this.goToViewAll();
  }

  calculateAge (birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  get searchInput () {
    return this.options.get('search');
  }

  get statusInput () {
    return this.options.get('status');
  }

  get roleInput () {
    return this.options.get('role');
  }
}


