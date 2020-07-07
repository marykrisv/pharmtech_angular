import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { ManufacturerInterface } from 'src/app/interface/manufacturer.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-manufacturerdetail',
  templateUrl: './manufacturerdetail.component.html',
  styleUrls: ['./manufacturerdetail.component.scss']
})
export class ManufacturerdetailComponent implements OnInit {

  userSession: SessionInterface;
  manDetails: ManufacturerInterface = null;
  manId;

  //adding status
  stillUpdatingManufacturer: boolean = false;
  stillDeletingManufacturer: boolean = false;

  updated: boolean = false;

  manForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private manService: ManufacturerService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.manId = params.get('manId');
    });

    this.populateDetails();
  }

  back() {
    if ((this.manForm.touched || this.manForm.dirty) && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/manufacturers']);
      }
    } else {
      this.router.navigate(['/menu/manufacturers']);
    }
  }

  populateDetails () {    
    this.manService.viewManufacturerDetail(this.manId).then(response => {
      if (response['data'] != null) {
        this.manDetails = <ManufacturerInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  intializeForm() {
    if (this.manDetails != null) {
      this.nameInput.setValue(this.manDetails.manName);
      this.addressInput.setValue(this.manDetails.manAddress);
    }
  }

  updateManufacturer() {
    if (confirm('Are you sure you want to update this manufacturer?')) {
      this.stillUpdatingManufacturer = true;
      const manufacturer = {
        manName: this.nameInput.value,
        manAddress: this.addressInput.value,
        manModifiedBy: this.userSession.userId,
        manModifiedOn: new Date(),
        manId: this.manDetails.manId
      }
      this.manService.updateManufacturer(manufacturer).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.updated = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillUpdatingManufacturer = false;
      });
    }
  }

  deleteManufacturer() {
    if (confirm('Are you sure you want to delete this manufacturer?')) {
      this.stillDeletingManufacturer = true;
      const manufacturer = {
        manModifiedBy: this.userSession.userId,
        manModifiedOn: new Date(),
        manId: this.manDetails.manId
      }
      this.manService.deleteManufacturer(manufacturer).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/manufacturers"]);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillDeletingManufacturer = false;
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
