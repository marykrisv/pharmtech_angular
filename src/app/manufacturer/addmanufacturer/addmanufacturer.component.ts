import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-addmanufacturer',
  templateUrl: './addmanufacturer.component.html',
  styleUrls: ['./addmanufacturer.component.scss']
})
export class AddmanufacturerComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingManufacturer: boolean = false;

  added: boolean = false;

  manForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private auth: AuthService,
    private manService: ManufacturerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.manForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/manufacturers']);
      }
    } else {
      this.router.navigate(['/menu/manufacturers']);
    }
  }

  addNewManufacturer() {
    if (confirm('Are you sure you want to save this manufacturer?')) {
      this.stillCreatingManufacturer = true;
      const manufacturer = {
        manName: this.nameInput.value,
        manAddress: this.addressInput.value,
        manCreatedBy: this.userSession.userId
      }
      this.manService.createNewManufacturer(manufacturer).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingManufacturer = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.nameInput.setValue('');
      this.addressInput.setValue('');
    }
  }

  get nameInput() {
    return this.manForm.get('name');
  }

  get addressInput() {
    return this.manForm.get('address');
  }

}
