import { Component, OnInit } from '@angular/core';
import { DrugallergyInterface } from 'src/app/interface/drugallergy.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandling } from 'src/app/common/error-handling';
import { DrugallergyService } from 'src/app/services/drugallergy.service';

@Component({
  selector: 'app-viewdrugallergy',
  templateUrl: './viewdrugallergy.component.html',
  styleUrls: ['./viewdrugallergy.component.scss']
})
export class ViewdrugallergyComponent implements OnInit {

  drugallergys: Drugallergys[] = null;
  drugcIds: number[] = null;
  userSession: SessionInterface;

  totalDrugCount: number;

  loading: boolean = false;

  drugSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Abr: ',
      sqlSearch: 'drugAbr'
    },
    {
      filterString: 'Name: ',
      sqlSearch: 'drugName'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private drugService: DrugallergyService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllDrugallergy();
  }

  viewAllDrugallergy () {
    this.drugService.viewAllDrugallergy().then(response => {
      this.populateDrugallergy(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateDrugallergy(response) {
    this.drugallergys = [];
    this.drugcIds = [];
    this.loading = true;
    if (response['data'] != undefined) {
      var tempdrugallergys = <DrugallergyInterface[]>response['data'];
      for (var i = 0; i < tempdrugallergys.length; i++) {
        var drugcId = tempdrugallergys[i].drugcId;
        var indexOf = this.drugcIds.indexOf(drugcId);
        if (indexOf == -1) { // not in the list
          var aValue = [tempdrugallergys[i].drugaValue];
          const allergy: Drugallergys = {
            drugcId: drugcId,
            drugcValue: tempdrugallergys[i].drugcValue,
            drugaValues: aValue,
            drugcCreatedBy: tempdrugallergys[i].drugcCreatedBy
          }
          this.drugallergys.push(allergy);
          this.drugcIds.push(drugcId);
        } else {
          this.drugallergys[indexOf].drugaValues.push(tempdrugallergys[i].drugaValue);
        }
      }
      this.totalDrugCount = this.drugallergys.length;
    } else {
      this.drugallergys = null;
      this.totalDrugCount = 0;
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

  deleteDrugallergy (drugcId) {
    if (confirm('Are you sure you want to delete this drugallergy?')) {
      const drugallergy = {
        drugcId: drugcId,
        drugcModifiedOn: new Date(),
        drugcModifiedBy: this.userSession.userId
      }
      this.drugService.deleteDrugallergy(drugallergy).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(drugcId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (drugcId) {
    for(let i = 0; i < this.drugallergys.length; ++i){
      if (this.drugallergys[i].drugcId === drugcId) {
          this.drugallergys.splice(i,1);
          this.totalDrugCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

}

interface Drugallergys {
  drugcId: number,
  drugcValue: string,
  drugaValues: string[],
  drugcCreatedBy: string
}
