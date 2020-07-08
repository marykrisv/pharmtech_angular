import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UomService } from 'src/app/services/uom.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-adduom',
  templateUrl: './adduom.component.html',
  styleUrls: ['./adduom.component.scss']
})
export class AdduomComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingUom: boolean = false;

  added: boolean = false;

  uomForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    canBeComputed: new FormControl(false)
  });

  constructor(
    private auth: AuthService,
    private uomService: UomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.uomForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/uoms']);
      }
    } else {
      this.router.navigate(['/menu/uoms']);
    }
  }

  addNewUom() {
    if (confirm('Are you sure you want to save this uom?')) {
      this.stillCreatingUom = true;
      const uom = {
        uomName: this.nameInput.value,
        uomCanBeComputed: this.canBeComputedInput.value,
        uomCreatedBy: this.userSession.userId
      }
      this.uomService.createNewUom(uom).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingUom = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.nameInput.setValue('');
      this.canBeComputedInput.setValue(false);
    }
  }

  get nameInput() {
    return this.uomForm.get('name');
  }

  get canBeComputedInput() {
    return this.uomForm.get('canBeComputed');
  }

}
