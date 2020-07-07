import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { RestrictionService } from 'src/app/services/restriction.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-addrestriction',
  templateUrl: './addrestriction.component.html',
  styleUrls: ['./addrestriction.component.scss']
})
export class AddrestrictionComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingRestriction: boolean = false;

  added: boolean = false;

  resForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    icon: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(
    private auth: AuthService,
    private resService: RestrictionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.resForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/restrictions']);
      }
    } else {
      this.router.navigate(['/menu/restrictions']);
    }
  }

  addNewRestriction() {
    if (confirm('Are you sure you want to save this restriction?')) {
      this.stillCreatingRestriction = true;
      const restriction = {
        resName: this.nameInput.value,
        resIcon: this.iconInput.value,
        resCreatedBy: this.userSession.userId
      }
      this.resService.createNewRestriction(restriction).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingRestriction = false;
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
