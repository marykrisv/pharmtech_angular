import { Component, OnInit } from '@angular/core';
import { DosageInterface } from 'src/app/interface/dosage.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DosageService } from 'src/app/services/dosage.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewdosage',
  templateUrl: './viewdosage.component.html',
  styleUrls: ['./viewdosage.component.scss']
})
export class ViewdosageComponent implements OnInit {

  dosages: DosageInterface[] = null;
  userSession: SessionInterface;

  totalDosCount: number;

  loading: boolean = false;

  dosSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Abr: ',
      sqlSearch: 'dosAbr'
    },
    {
      filterString: 'Name: ',
      sqlSearch: 'dosName'
    }
  ]

  options = new FormGroup({
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private dosService: DosageService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllDosage();
  }

  viewAllDosage () {
    this.dosService.viewAllDosage().then(response => {
      this.populateDosage(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateDosage(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.dosages = <DosageInterface[]>response['data'];
      this.totalDosCount = response['data'][0]['total'];
    } else {
      this.dosages = null;
      this.totalDosCount = 0;
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

  deleteDosage (dosId) {
    if (confirm('Are you sure you want to delete this dosage?')) {
      const dosage = {
        dosId: dosId,
        dosModifiedOn: new Date(),
        dosModifiedBy: this.userSession.userId
      }
      this.dosService.deleteDosage(dosage).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(dosId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (dosId) {
    for(let i = 0; i < this.dosages.length; ++i){
      if (this.dosages[i].dosId === dosId) {
          this.dosages.splice(i,1);
          this.totalDosCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

}
