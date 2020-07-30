import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { ConcentrationInterface } from 'src/app/interface/concentration.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcentrationService } from 'src/app/services/concentration.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-concentrationdetail',
  templateUrl: './concentrationdetail.component.html',
  styleUrls: ['./concentrationdetail.component.scss']
})
export class ConcentrationdetailComponent implements OnInit {

  userSession: SessionInterface;
  conDetails: ConcentrationInterface = null;
  conId;

  //adding status
  stillUpdatingConcentration: boolean = false;
  stillDeletingConcentration: boolean = false;

  updated: boolean = false;

  conForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private conService: ConcentrationService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.conId = params.get('conId');
    });

    this.populateDetails();
  }

  back() {
    if (this.conForm.touched && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/concentrations']);
      }
    } else {
      this.router.navigate(['/menu/concentrations']);
    }
  }

  populateDetails () {    
    this.conService.viewDetail(this.conId).subscribe(response => {
      if (response['data'] != null) {
        this.conDetails = <ConcentrationInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }, (error) => {
      alert(error);
    })
  }

  intializeForm() {
    if (this.conDetails != null) {
      this.valueInput.setValue(this.conDetails.conValue);
    }
  }

  updateConcentration() {
    if (confirm('Are you sure you want to update this concentration?')) {
      this.stillUpdatingConcentration = true;
      const concentration = {
        conValue: this.valueInput.value,
        conModifiedBy: this.userSession.userId,
        conModifiedOn: new Date(),
        conId: this.conDetails.conId
      }
      this.conService.update(concentration).subscribe(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.updated = true;
        } else {
          alert(ErrorHandling.showError(response));
        }    
        
        this.stillUpdatingConcentration = false;
      }, (error) => {
        alert(error);
      })
    }
  }

  deleteConcentration() {
    if (confirm('Are you sure you want to delete this concentration?')) {
      this.stillDeletingConcentration = true;
      const concentration = {
        conModifiedBy: this.userSession.userId,
        conModifiedOn: new Date(),
        conId: this.conDetails.conId
      }
      this.conService.delete(concentration).subscribe(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/concentrations"]);
        } else {
          alert(ErrorHandling.showError(response));
        }     
        
        this.stillDeletingConcentration = false;
      })
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.valueInput.setValue('');
    }
  }

  get valueInput() {
    return this.conForm.get('value');
  }

}
