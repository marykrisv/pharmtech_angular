import { SearchValidator } from 'src/app/validators/search.validator';
import { LocationService } from './../../services/location.service';
import { LocationInterface } from './../../interface/location.interface';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandling } from 'src/app/common/error-handling';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-viewlocation',
  templateUrl: './viewlocation.component.html',
  styleUrls: ['./viewlocation.component.scss']
})
export class ViewlocationComponent implements OnInit {

  locations: LocationInterface[] = null;
  userSession: SessionInterface;

  totalLocationCount: number;

  loading: boolean = false;

  locationSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Name: ',
      sqlSearch: 'locName'
    },
    {
      filterString: 'Description: ',
      sqlSearch: 'locDescription'
    },
    {
      filterString: 'Latitude: ',
      sqlSearch: 'locLatitude'
    },
    {
      filterString: 'Longitude: ',
      sqlSearch: 'locLongitude'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy, SearchValidator.isSearchLocationInvalid)
  });

  constructor(
    private auth: AuthService,
    private locService: LocationService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllLocation();
  }

  viewAllLocation () {
    this.locService.viewAllLocation().then(response => {
      this.populateLocation(response);
    }).catch(response => {
      alert(ErrorHandling.showError(response));
    });
  }

  populateLocation(response) {
    if (response['data'] != undefined) {
      this.locations = <LocationInterface[]>response['data'];
      this.totalLocationCount = response['data'][0]['total'];
    } else {
      this.locations = null;
      this.totalLocationCount = 0;
    }
  }

  changeFilterBy (filterBy: string) {
    var prevFilterBy = this.filterBy;
    this.filterBy = filterBy+": ";
    if (this.searchInput.invalid) {
      this.searchInput.setValue(this.filterBy);
    } else {
      this.locationSearchInput = this.searchInput.value.toString().trim();
      this.locationSearchInput = this.locationSearchInput.substr(prevFilterBy.length, this.locationSearchInput.length);

      if (this.locationSearchInput != null) {
        this.searchInput.setValue(this.filterBy+this.locationSearchInput);
      }
    }   
  }

  removeFilter() {
    // this.locationSearchInput = null;
    // this.filterBy = "";
    // this.searchInput.setValue(this.filterBy);
    // this.viewAllLocation();
  }

  search() {
    // if (this.searchInput.invalid) {
    //   alert("Fix search text first");
    // } else {
    //   this.locationSearchInput = this.searchInput.value.toString().trim();
    //   this.locationSearchInput = this.locationSearchInput.substr(this.filterBy.length, this.locationSearchInput.length);

    //   if (this.locationSearchInput.trim() != '' && this.locationSearchInput != null && this.locationSearchInput != '') {
    //     //search here
    //     var searchBy: string;
    //     for (var i = 0; i < this.filterByList.length; i++) {
    //       if (this.filterByList[i].filterString == this.filterBy) {
    //         searchBy = this.filterByList[i].sqlSearch;
    //       }
    //     }

    //     // this.locService.searchUserAllLocation(this.userSession.userLocId, searchBy, this.userSearchInput).then(response=> {
    //     //   this.populateUsers(response);
    //     // }).catch(response=> {
    //     //   alert("Error. Connection Problem!");
    //     // });
    //   }
    // }
  }

  deleteLocation (locId) {
    if (confirm('Are you sure you want to delete this location?')) {
      const user = {
        locId: locId,
        locModifiedOn: new Date(),
        locModifiedBy: this.userSession.userId
      }
      // this.userService.deleteUser(user).then(response => {
      //   if (response['success'] == true) {
      //     alert(response['message']);
          
      //     //delete row
      //     this.deleteRow(userId);

      //   } else {
      //     alert(response['message']);
      //   }
      // }).catch(response => {
      //   alert("Connection Problem. Please check your internet.");
      // });
    }
  }

  get searchInput () {
    return this.options.get('search');
  }
}
