import { Component, OnInit } from '@angular/core';
import { UomInterface } from 'src/app/interface/uom.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UomService } from 'src/app/services/uom.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewuom',
  templateUrl: './viewuom.component.html',
  styleUrls: ['./viewuom.component.scss']
})
export class ViewuomComponent implements OnInit {

  uoms: UomInterface[] = null;
  userSession: SessionInterface;

  totalUomCount: number;

  loading: boolean = false;

  uomSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Name: ',
      sqlSearch: 'uomName'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private uomService: UomService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllUom();
  }

  viewAllUom () {
    this.uomService.viewAllUom().then(response => {
      this.populateUom(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateUom(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.uoms = <UomInterface[]>response['data'];
      this.totalUomCount = response['data'][0]['total'];
    } else {
      this.uoms = null;
      this.totalUomCount = 0;
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

  deleteUom (uomId) {
    if (confirm('Are you sure you want to delete this uom?')) {
      const uom = {
        uomId: uomId,
        uomModifiedOn: new Date(),
        uomModifiedBy: this.userSession.userId
      }
      this.uomService.deleteUom(uom).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(uomId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (uomId) {
    for(let i = 0; i < this.uoms.length; ++i){
      if (this.uoms[i].uomId === uomId) {
          this.uoms.splice(i,1);
          this.totalUomCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

}
