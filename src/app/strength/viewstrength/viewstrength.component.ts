import { Component, OnInit } from '@angular/core';
import { StrengthInterface } from 'src/app/interface/strength.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { StrengthService } from 'src/app/services/strength.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewstrength',
  templateUrl: './viewstrength.component.html',
  styleUrls: ['./viewstrength.component.scss']
})
export class ViewstrengthComponent implements OnInit {

  strengths: StrengthInterface[] = null;
  userSession: SessionInterface;

  totalStrCount: number;

  loading: boolean = false;

  strSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Value: ',
      sqlSearch: 'strValue'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private strService: StrengthService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllStrength();
  }

  viewAllStrength () {
    this.strService.viewAllStrength().then(response => {
      this.populateStrength(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateStrength(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.strengths = <StrengthInterface[]>response['data'];
      this.totalStrCount = response['data'][0]['total'];
    } else {
      this.strengths = null;
      this.totalStrCount = 0;
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

  deleteStrength (strId) {
    if (confirm('Are you sure you want to delete this strength?')) {
      const strength = {
        strId: strId,
        strModifiedOn: new Date(),
        strModifiedBy: this.userSession.userId
      }
      this.strService.deleteStrength(strength).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(strId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (strId) {
    for(let i = 0; i < this.strengths.length; ++i){
      if (this.strengths[i].strId === strId) {
          this.strengths.splice(i,1);
          this.totalStrCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

}
