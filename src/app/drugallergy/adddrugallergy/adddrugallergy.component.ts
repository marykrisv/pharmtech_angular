import { DrugallergyInterface } from './../../interface/drugallergy.interface';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DrugallergyService } from 'src/app/services/drugallergy.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-adddrugallergy',
  templateUrl: './adddrugallergy.component.html',
  styleUrls: ['./adddrugallergy.component.scss']
})
export class AdddrugallergyComponent implements OnInit {

  userSession: SessionInterface;
  drugallergies: string[] = []; 

  //adding status
  stillCreatingDrugallergy: boolean = false;

  added: boolean = false;

  flagSuccessful = false;

  drugForm = new FormGroup({
    drugclass: new FormControl('', [Validators.required, Validators.minLength(2)]),
    drugallergy: new FormControl('', Validators.minLength(2))
  });

  constructor(
    private auth: AuthService,
    private drugService: DrugallergyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.drugForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/drugallergy']);
      }
    } else {
      this.router.navigate(['/menu/drugallergy']);
    }
  }

  addNewDrugallergy() {
    if (confirm('Are you sure you want to save this drugallergy?')) {
      this.stillCreatingDrugallergy = true;      
      var drugclass = this.drugclassInput.value.toString().trim();
      const drugc = {
        drugcValue: drugclass,
        drugcCreatedBy: this.userSession.userId
      }
      this.drugService.createNewDrugclass(drugc).then(response => {
        if (response['success'] == true) {
          var drugcId = response['drugcId'];

          //add drug allergies
          this.addDrugAllergies(drugcId);
        }
      }).finally(() => {
      });
      
    }
  }

  private addDrugAllergies (drugcId: number) {
    this.drugallergies.forEach(allergy => {
      const drugallergy = {
        drugClassId: drugcId,
        drugaValue: allergy
      }
      this.drugService.createNewDrugallergy(drugallergy).then(response => {
        console.log(response);
        if (response['success'] == true) {
          this.added = true;
        }    
      }).catch(response => {
        this.flagSuccessful = false;
        console.log("Connection Problem. Please check your internet.");
      });
    });

    console.log("should be last");
    this.stillCreatingDrugallergy = false;

    
    // console.log("finally");
    // if (this.flagSuccessful) {
    //   alert("Drug class successfully added!");
    // } else {
    //   alert("ERROR. Drug class creation failed!");
    // }
    // this.stillCreatingDrugallergy = false;
  }

  removeAllergy(drug) {
    var indexOf = this.drugallergies.indexOf(drug);
    if (indexOf != -1) {
      this.drugallergies.splice(indexOf, 1);
    }
  }

  addAllergy() {
    if (this.drugallergyInput.invalid) {
      alert("invalid Allergy");
    } else {
      var allergy = this.drugallergyInput.value.toString().trim();
      if (allergy == '') {
        alert("invalid Allergy");
      } else {
        if (this.drugallergies.indexOf(allergy) == -1) { //not found
          this.drugallergies.push(allergy);
          this.drugallergyInput.setValue('');
          this.drugallergies.sort();
        } else {
          alert("Already exists in the list!");
        }
      }
    }
    
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.drugclassInput.setValue('');
      this.drugallergies.splice(0);
    }
  }

  get drugclassInput() {
    return this.drugForm.get('drugclass');
  }

  get drugallergyInput() {
    return this.drugForm.get('drugallergy');
  }

}
