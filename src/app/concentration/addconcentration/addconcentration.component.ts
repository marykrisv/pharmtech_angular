import { ConcentrationService } from './../../services/concentration.service';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorHandling } from 'src/app/common/error-handling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addconcentration',
  templateUrl: './addconcentration.component.html',
  styleUrls: ['./addconcentration.component.scss']
})
export class AddconcentrationComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingConcentration: boolean = false;

  conForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private auth: AuthService,
    private conService: ConcentrationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.conForm.touched) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/concentrations']);
      }
    } else {
      this.router.navigate(['/menu/concentrations']);
    }
  }

  addNewConcentration() {
    if (confirm('Are you sure you want to save this concentration?')) {
      this.stillCreatingConcentration = true;
      const concentration = {
        conValue: this.valueInput.value,
        conCreatedBy: this.userSession.userId
      }
      this.conService.createNewConcentration(concentration).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        console.log(response);
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingConcentration = false;
      });
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
