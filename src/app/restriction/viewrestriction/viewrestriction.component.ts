import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { RestrictionInterface } from 'src/app/interface/restriction.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestrictionService } from 'src/app/services/restriction.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewrestriction',
  templateUrl: './viewrestriction.component.html',
  styleUrls: ['./viewrestriction.component.scss']
})
export class ViewrestrictionComponent implements OnInit {

  restrictions: RestrictionInterface[] = null;
  userSession: SessionInterface;

  totalResCount: number;

  loading: boolean = false;

  resSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Name: ',
      sqlSearch: 'resName'
    },
    {
      filterString: 'Icon: ',
      sqlSearch: 'resIcon'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private resService: RestrictionService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllRestriction();
  }

  viewAllRestriction () {
    this.resService.viewAllRestriction().then(response => {
      this.populateRestriction(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateRestriction(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.restrictions = <RestrictionInterface[]>response['data'];
      this.totalResCount = response['data'][0]['total'];
    } else {
      this.restrictions = null;
      this.totalResCount = 0;
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

  deleteRestriction (resId) {
    if (confirm('Are you sure you want to delete this restriction?')) {
      const restriction = {
        resId: resId,
        resModifiedOn: new Date(),
        resModifiedBy: this.userSession.userId
      }
      this.resService.deleteRestriction(restriction).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(resId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (resId) {
    for(let i = 0; i < this.restrictions.length; ++i){
      if (this.restrictions[i].resId === resId) {
          this.restrictions.splice(i,1);
          this.totalResCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

}
