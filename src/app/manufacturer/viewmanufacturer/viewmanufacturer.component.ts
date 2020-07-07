import { Component, OnInit } from '@angular/core';
import { ManufacturerInterface } from 'src/app/interface/manufacturer.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewmanufacturer',
  templateUrl: './viewmanufacturer.component.html',
  styleUrls: ['./viewmanufacturer.component.scss']
})
export class ViewmanufacturerComponent implements OnInit {

  manufacturers: ManufacturerInterface[] = null;
  userSession: SessionInterface;

  totalManCount: number;

  loading: boolean = false;

  manSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Name: ',
      sqlSearch: 'manValue'
    },
    {
      filterString: 'Percent: ',
      sqlSearch: 'manPercent'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private manService: ManufacturerService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllManufacturer();
  }

  viewAllManufacturer () {
    this.manService.viewAllManufacturer().then(response => {
      this.populateManufacturer(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateManufacturer(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.manufacturers = <ManufacturerInterface[]>response['data'];
      this.totalManCount = response['data'][0]['total'];
    } else {
      this.manufacturers = null;
      this.totalManCount = 0;
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

  deleteManufacturer (manId) {
    if (confirm('Are you sure you want to delete this manufacturer?')) {
      const manufacturer = {
        manId: manId,
        manModifiedOn: new Date(),
        manModifiedBy: this.userSession.userId
      }
      this.manService.deleteManufacturer(manufacturer).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(manId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (manId) {
    for(let i = 0; i < this.manufacturers.length; ++i){
      if (this.manufacturers[i].manId === manId) {
          this.manufacturers.splice(i,1);
          this.totalManCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }
}
