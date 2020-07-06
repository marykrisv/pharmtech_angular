import { Component, OnInit } from '@angular/core';
import { DiscountInterface } from 'src/app/interface/discount.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DiscountService } from 'src/app/services/discount.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewdiscount',
  templateUrl: './viewdiscount.component.html',
  styleUrls: ['./viewdiscount.component.scss']
})
export class ViewdiscountComponent implements OnInit {

  discounts: DiscountInterface[] = null;
  userSession: SessionInterface;

  totalDisCount: number;

  loading: boolean = false;

  disSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Name: ',
      sqlSearch: 'disValue'
    },
    {
      filterString: 'Percent: ',
      sqlSearch: 'disPercent'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private disService: DiscountService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllDiscount();
  }

  viewAllDiscount () {
    this.disService.viewAllDiscount().then(response => {
      this.populateDiscount(response);
    }).catch(response => {
      console.log(response);
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateDiscount(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.discounts = <DiscountInterface[]>response['data'];
      this.totalDisCount = response['data'][0]['total'];
    } else {
      this.discounts = null;
      this.totalDisCount = 0;
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

  deleteDiscount (disId) {
    if (confirm('Are you sure you want to delete this discount?')) {
      const discount = {
        disId: disId,
        disModifiedOn: new Date(),
        disModifiedBy: this.userSession.userId
      }
      this.disService.deleteDiscount(discount).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(disId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (disId) {
    for(let i = 0; i < this.discounts.length; ++i){
      if (this.discounts[i].disId === disId) {
          this.discounts.splice(i,1);
          this.totalDisCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

}
