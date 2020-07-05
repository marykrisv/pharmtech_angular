import { ConcentrationService } from './../../services/concentration.service';
import { Component, OnInit } from '@angular/core';
import { ConcentrationInterface } from 'src/app/interface/concentration.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchValidator } from 'src/app/validators/search.validator';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewconcentration',
  templateUrl: './viewconcentration.component.html',
  styleUrls: ['./viewconcentration.component.scss']
})
export class ViewconcentrationComponent implements OnInit {

  concentrations: ConcentrationInterface[] = null;
  userSession: SessionInterface;

  totalConCount: number;

  loading: boolean = false;

  conSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Value: ',
      sqlSearch: 'conValue'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy, SearchValidator.isSearchLocationInvalid)
  });

  constructor(
    private auth: AuthService,
    private conService: ConcentrationService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllConcentration();
  }

  viewAllConcentration () {
    this.conService.viewAllConcentration().then(response => {
      this.populateConcentration(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateConcentration(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.concentrations = <ConcentrationInterface[]>response['data'];
      this.totalConCount = response['data'][0]['total'];
    } else {
      this.concentrations = null;
      this.totalConCount = 0;
      // alert(ErrorHandling.showError(response));
    }
    this.loading = false;
  }

  changeFilterBy (filterBy: string) {
    // var prevFilterBy = this.filterBy;
    // this.filterBy = filterBy+": ";
    // if (this.searchInput.invalid) {
    //   this.searchInput.setValue(this.filterBy);
    // } else {
    //   this.locationSearchInput = this.searchInput.value.toString().trim();
    //   this.locationSearchInput = this.locationSearchInput.substr(prevFilterBy.length, this.locationSearchInput.length);

    //   if (this.locationSearchInput != null) {
    //     this.searchInput.setValue(this.filterBy+this.locationSearchInput);
    //   }
    // }   
  }

  search() {

  }

  removeFilter() {
    // this.locationSearchInput = null;
    // this.filterBy = "";
    // this.searchInput.setValue(this.filterBy);
    // this.viewAllLocation();
  }

  deleteLocation (locId) {
    // if (confirm('Are you sure you want to delete this location?')) {
    //   const location = {
    //     locId: locId,
    //     locModifiedOn: new Date(),
    //     locModifiedBy: this.userSession.userId
    //   }
    //   this.locService.deleteLocation(location).then(response => {
    //     if (response['success'] == true) {
    //       alert(response['message']);
          
    //       //delete row
    //       this.deleteRow(locId);

    //     } else {
    //       alert(ErrorHandling.showError(response));
    //     }
    //   }).catch(response => {
    //     alert("Connection Problem. Please check your internet.");
    //   });
    // }
  }

  deleteRow (locId) {
    // for(let i = 0; i < this.locations.length; ++i){
    //   if (this.locations[i].locId === locId) {
    //       this.locations.splice(i,1);
    //   }
    // }
  }

  get searchInput () {
    return this.options.get('search');
  }

}
