import { LocationInterface } from './../../interface/location.interface';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { ErrorHandling } from 'src/app/common/error-handling';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-locationdetail',
  templateUrl: './locationdetail.component.html',
  styleUrls: ['./locationdetail.component.scss']
})
export class LocationdetailComponent implements OnInit {

  userSession: SessionInterface;
  locDetails: LocationInterface = null;
  locId;

  //adding status
  stillUpdatingLocation: boolean = false;
  stillDeletingLocation: boolean = false;

  locForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', Validators.required),
    latitude: new FormControl(''),
    longitude: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private locService: LocationService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.locId = params.get('locId');
    });

    this.populateDetails();
  }

  populateDetails () {    
    this.locService.viewLocationDetail(this.locId).then(response => {
      if (response['data'] != null) {
        this.locDetails = <LocationInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  back() {
    if (this.locForm.touched) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/locations']);
      }
    } else {
      this.router.navigate(['/menu/locations']);
    }
  }

  intializeForm() {
    if (this.locDetails != null) {
      this.nameInput.setValue(this.locDetails.locName);
      this.descriptionInput.setValue(this.locDetails.locDescription);
      this.latitudeInput.setValue(this.locDetails.locLatitude);
      this.longitudeInput.setValue(this.locDetails.locLongitude);
    }
  }

  updateLocation() {
    if (confirm('Are you sure you want to update this location?')) {
      this.stillUpdatingLocation = true;
      const location = {
        locName: this.nameInput.value,
        locDescription: this.descriptionInput.value,
        locLatitude: this.latitudeInput.value,
        locLongitude: this.longitudeInput.value,
        locModifiedBy: this.userSession.userId,
        locModifiedOn: new Date(),
        locId: this.locDetails.locId
      }
      this.locService.updateLocation(location).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillUpdatingLocation = false;
      });
    }
  }

  deleteLocation() {
    if (confirm('Are you sure you want to delete this location?')) {
      this.stillDeletingLocation = true;
      const location = {
        locModifiedBy: this.userSession.userId,
        locModifiedOn: new Date(),
        locId: this.locDetails.locId
      }
      this.locService.deleteLocation(location).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/locations"]);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillDeletingLocation = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.nameInput.setValue('');
      this.descriptionInput.setValue('');
      this.latitudeInput.setValue('');
      this.longitudeInput.setValue('');
    }
  }

  get nameInput() {
    return this.locForm.get('name');
  }

  get descriptionInput() {
    return this.locForm.get('description');
  }

  get latitudeInput() {
    return this.locForm.get('latitude');
  }

  get longitudeInput() {
    return this.locForm.get('longitude');
  }
}
