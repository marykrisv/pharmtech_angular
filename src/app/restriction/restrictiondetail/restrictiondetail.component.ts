import { Component, OnInit } from '@angular/core';
import { RestrictionInterface } from 'src/app/interface/restriction.interface';
import { RestrictionService } from 'src/app/services/restriction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionInterface } from 'src/app/interface/session.interface';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-restrictiontdetail',
  templateUrl: './restrictiondetail.component.html',
  styleUrls: ['./restrictiondetail.component.scss']
})
export class RestrictiondetailComponent implements OnInit {

  userSession: SessionInterface;
  resDetails: RestrictionInterface = null;
  resId;

  //adding status
  stillUpdatingRestriction: boolean = false;
  stillDeletingRestriction: boolean = false;

  updated: boolean = false;

  resForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    icon: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private resService: RestrictionService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.resId = params.get('resId');
    });

    this.populateDetails();
  }

  back() {
    if ((this.resForm.touched || this.resForm.dirty) && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/restrictions']);
      }
    } else {
      this.router.navigate(['/menu/restrictions']);
    }
  }

  populateDetails () {    
    this.resService.viewRestrictionDetail(this.resId).then(response => {
      if (response['data'] != null) {
        this.resDetails = <RestrictionInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  intializeForm() {
    if (this.resDetails != null) {
      this.nameInput.setValue(this.resDetails.resName);
      this.iconInput.setValue(this.resDetails.resIcon);
    }
  }

  updateRestriction() {
    if (confirm('Are you sure you want to update this restriction?')) {
      this.stillUpdatingRestriction = true;
      const restriction = {
        resName: this.nameInput.value,
        resIcon: this.iconInput.value,
        resModifiedBy: this.userSession.userId,
        resModifiedOn: new Date(),
        resId: this.resDetails.resId
      }
      this.resService.updateRestriction(restriction).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.updated = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillUpdatingRestriction = false;
      });
    }
  }

  deleteRestriction() {
    if (confirm('Are you sure you want to delete this restriction?')) {
      this.stillDeletingRestriction = true;
      const restriction = {
        resModifiedBy: this.userSession.userId,
        resModifiedOn: new Date(),
        resId: this.resDetails.resId
      }
      this.resService.deleteRestriction(restriction).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/restrictions"]);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillDeletingRestriction = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.nameInput.setValue('');
      this.iconInput.setValue('');
    }
  }

  get nameInput() {
    return this.resForm.get('name');
  }

  get iconInput() {
    return this.resForm.get('icon');
  }

}
