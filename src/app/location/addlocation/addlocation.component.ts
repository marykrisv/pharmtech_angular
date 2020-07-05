import { AuthService } from './../../auth/auth.service';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.scss']
})
export class AddlocationComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingLocation: boolean = false;

  locForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', Validators.required),
    latitude: new FormControl(''),
    longitude: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private locService: LocationService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  addNewLocation() {
    if (confirm('Are you sure you want to save this location?')) {
      this.stillCreatingLocation = true;
      const location = {
        locName: this.nameInput.value,
        locDescription: this.descriptionInput.value,
        locLatitude: this.latitudeInput.value,
        locLongitude: this.longitudeInput.value,
        loCreatedBy: this.userSession.userId
      }
      this.locService.createNewLocation(location).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert(ErrorHandling.showError(response));
      }).finally(() => {
        this.stillCreatingLocation = false;
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
