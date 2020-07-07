import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { DosageInterface } from 'src/app/interface/dosage.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DosageService } from 'src/app/services/dosage.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-dosagedetail',
  templateUrl: './dosagedetail.component.html',
  styleUrls: ['./dosagedetail.component.scss']
})
export class DosagedetailComponent implements OnInit {

  userSession: SessionInterface;
  dosDetails: DosageInterface = null;
  dosId;

  //adding status
  stillUpdatingDosage: boolean = false;
  stillDeletingDosage: boolean = false;

  updated: boolean = false;

  dosForm = new FormGroup({
    abr: new FormControl('', [Validators.required, Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    withConcentration: new FormControl(false)
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dosService: DosageService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.dosId = params.get('dosId');
    });

    this.populateDetails();
  }

  back() {
    if ((this.dosForm.touched || this.dosForm.dirty) && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/dosages']);
      }
    } else {
      this.router.navigate(['/menu/dosages']);
    }
  }

  populateDetails () {    
    this.dosService.viewDosageDetail(this.dosId).then(response => {
      if (response['data'] != null) {
        this.dosDetails = <DosageInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  intializeForm() {
    if (this.dosDetails != null) {
      this.abrInput.setValue(this.dosDetails.dosAbr);
      this.nameInput.setValue(this.dosDetails.dosName);
      this.withConcentrationInput.setValue(+this.dosDetails.dosWithConcentration);
    }
  }

  updateDosage() {
    if (confirm('Are you sure you want to update this dosage?')) {
      this.stillUpdatingDosage = true;
      const dosage = {
        dosAbr: this.abrInput.value,
        dosName: this.nameInput.value,
        dosWithConcentration: this.withConcentrationInput.value,
        dosModifiedBy: this.userSession.userId,
        dosModifiedOn: new Date(),
        dosId: this.dosDetails.dosId
      }
      this.dosService.updateDosage(dosage).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.updated = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillUpdatingDosage = false;
      });
    }
  }

  deleteDosage() {
    if (confirm('Are you sure you want to delete this dosage?')) {
      this.stillDeletingDosage = true;
      const dosage = {
        dosModifiedBy: this.userSession.userId,
        dosModifiedOn: new Date(),
        dosId: this.dosDetails.dosId
      }
      this.dosService.deleteDosage(dosage).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/dosages"]);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillDeletingDosage = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.abrInput.setValue('');
      this.nameInput.setValue('');
      this.withConcentrationInput.setValue('');
    }
  }

  get abrInput() {
    return this.dosForm.get('abr');
  }

  get nameInput() {
    return this.dosForm.get('name');
  }

  get withConcentrationInput() {
    return this.dosForm.get('withConcentration');
  }

}
