import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { StrengthInterface } from 'src/app/interface/strength.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StrengthService } from 'src/app/services/strength.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-strengthdetail',
  templateUrl: './strengthdetail.component.html',
  styleUrls: ['./strengthdetail.component.scss']
})
export class StrengthdetailComponent implements OnInit {

  userSession: SessionInterface;
  strDetails: StrengthInterface = null;
  strId;

  //adding status
  stillUpdatingStrength: boolean = false;
  stillDeletingStrength: boolean = false;

  updated: boolean = false;

  strForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private strService: StrengthService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.strId = params.get('strId');
    });

    this.populateDetails();
  }

  back() {
    if ((this.strForm.touched || this.strForm.dirty) && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/strengths']);
      }
    } else {
      this.router.navigate(['/menu/strengths']);
    }
  }

  populateDetails () {    
    this.strService.viewStrengthDetail(this.strId).then(response => {
      if (response['data'] != null) {
        this.strDetails = <StrengthInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  intializeForm() {
    if (this.strDetails != null) {
      this.valueInput.setValue(this.strDetails.strValue);
    }
  }

  updateStrength() {
    if (confirm('Are you sure you want to update this strength?')) {
      this.stillUpdatingStrength = true;
      const strength = {
        strValue: this.valueInput.value,
        strModifiedBy: this.userSession.userId,
        strModifiedOn: new Date(),
        strId: this.strDetails.strId
      }
      this.strService.updateStrength(strength).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.updated = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillUpdatingStrength = false;
      });
    }
  }

  deleteStrength() {
    if (confirm('Are you sure you want to delete this strength?')) {
      this.stillDeletingStrength = true;
      const strength = {
        strModifiedBy: this.userSession.userId,
        strModifiedOn: new Date(),
        strId: this.strDetails.strId
      }
      this.strService.deleteStrength(strength).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/strengths"]);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillDeletingStrength = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.valueInput.setValue('');
    }
  }

  get valueInput() {
    return this.strForm.get('value');
  }

}
