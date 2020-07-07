import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { StrengthService } from 'src/app/services/strength.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-addstrength',
  templateUrl: './addstrength.component.html',
  styleUrls: ['./addstrength.component.scss']
})
export class AddstrengthComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingStrength: boolean = false;

  added: boolean = false;

  strForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private auth: AuthService,
    private strService: StrengthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.strForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/strengths']);
      }
    } else {
      this.router.navigate(['/menu/strengths']);
    }
  }

  addNewStrength() {
    if (confirm('Are you sure you want to save this strength?')) {
      this.stillCreatingStrength = true;
      const strength = {
        strValue: this.valueInput.value,
        strCreatedBy: this.userSession.userId
      }
      this.strService.createNewStrength(strength).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingStrength = false;
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
