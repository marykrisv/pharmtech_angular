import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DosageService } from 'src/app/services/dosage.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-adddosage',
  templateUrl: './adddosage.component.html',
  styleUrls: ['./adddosage.component.scss']
})
export class AdddosageComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingDosage: boolean = false;

  added: boolean = false;

  dosForm = new FormGroup({
    abr: new FormControl('', [Validators.required, Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    withConcentration: new FormControl(false)
  });

  constructor(
    private auth: AuthService,
    private dosService: DosageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.dosForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/dosages']);
      }
    } else {
      this.router.navigate(['/menu/dosages']);
    }
  }

  addNewDosage() {
    if (confirm('Are you sure you want to save this dosage?')) {
      this.stillCreatingDosage = true;
      const dosage = {
        dosAbr: this.abrInput.value,
        dosName: this.nameInput.value,
        dosWithConcentration: this.withConcentrationInput.value,
        dosCreatedBy: this.userSession.userId
      }
      this.dosService.create(dosage).subscribe(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        

        this.stillCreatingDosage = false;
      }, (error) => {
        alert(error);
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.abrInput.setValue('');
      this.nameInput.setValue('');
      this.withConcentrationInput.setValue(false);
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
