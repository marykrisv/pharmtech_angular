import { ErrorHandling } from 'src/app/common/error-handling';
import { ToolConfig } from './../../common/toolconfig';
import { LocationService } from './../../services/location.service';
import { LocationInterface } from './../../interface/location.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { UserStatus } from 'src/app/interface/user.interface';
import { UserInterface, UserRole } from './../../interface/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { SearchValidator } from 'src/app/validators/search.validator';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {

  users: UserInterface[];
  locations: LocationInterface[];
  userSession: SessionInterface;

  totalUserCount: number;

  loading: boolean = false;

  filterBy: string = "";
  userSearchInput: string = null;

  numberOfPages: number[] = null;
  currentPage: number;

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
    },
    {
      filterString: 'Role: ',
      sqlSearch: 'userRole'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy, SearchValidator.isSearchUserInvalid),
    location: new FormControl('All'),
    status: new FormControl('All')
  });

  constructor(
    private userService: UserService, 
    private auth: AuthService,
    private locService: LocationService
  ) { }

  ngOnInit(): void {
    // this.UserService.currentUsers.subscribe(users => this.users = users);
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });
    this.goToViewAll();
    this.populateLocations();
  }

  populateLocations() {
    this.locService.viewAllLocation().then(response => {
      if (response['data']) {
        this.locations = <LocationInterface[]>response['data'];
      } else {
        this.locations = null;
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateUsers(response) {
    if (response['data'] != undefined) {
      this.users = <UserInterface[]>response['data'];
      this.totalUserCount = response['data'][0]['total'];

      var numpages = Math.ceil(this.totalUserCount/ToolConfig.limitUsers);

      this.numberOfPages = Array(numpages).fill(0).map((x,i)=>i);
    } else {
      this.users = null;
      this.totalUserCount = 0;
      this.numberOfPages = [1];
    }
    this.currentPage = 0; //indexing
  }

  changePage(num) {
    this.currentPage = num;
  }

  filterByLocation () {
    var loc = this.locationInput.value;
    if (loc == 'All') {
      this.goToViewAll();
    } else {
      this.userService.getAllUsersFromThisLocation(loc).then(response => {
        this.populateUsers(response);
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  filterByStatus() {
    var status = this.statusInput.value;
    if (this.userSession.userRole == 'Super Admin') {
      if (status == 'All') {
        //do nothing for now
        this.goToViewAll();
      } else {
        this.userService.viewByStatusAllLocation(this.userSession.userLocId, status).then(response => {
          this.populateUsers(response);
        }).catch(response=> {
          alert("Connection Problem. Please check your internet.");
        });
      }
    } else {
      if (status == 'All') {
        //do nothing for now
        this.goToViewAll();
      } else {
        this.userService.viewByStatusOneLocation(this.userSession.userLocId, status).then(response => {
          this.populateUsers(response);
        }).catch(response=> {
          alert("Connection Problem. Please check your internet.");
        });
      }
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
          this.userService.searchUserAllLocation(this.userSession.userLocId, searchBy, this.userSearchInput).then(response=> {
            this.populateUsers(response);
          }).catch(response=> {
            alert("Connection Problem. Please check your internet.");
          });
        } else {
          this.userService.searchUserOneLocation(this.userSession.userLocId, searchBy, this.userSearchInput).then(response=> {
            this.populateUsers(response);
          }).catch(response=> {
            alert("Connection Problem. Please check your internet.");
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
      this.userService.deleteUser(user).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(userId);

        } else {
          alert(ErrorHandling.showError(response));
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
      this.userService.getAllUsersFromAllLocation().then(response => {
        this.populateUsers(response); 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    } else {
      // get all users from this location
      this.userService.getAllUsersFromThisLocation(this.userSession.userLocId).then(response => {
        this.populateUsers(response); 
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.loading = false;
      });
    }
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

  get locationInput () {
    return this.options.get('location');
  }
}


