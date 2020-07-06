import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { DiscountInterface } from 'src/app/interface/discount.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PercentValidator } from 'src/app/validators/percent.validator';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/services/discount.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-discountdetail',
  templateUrl: './discountdetail.component.html',
  styleUrls: ['./discountdetail.component.scss']
})
export class DiscountdetailComponent implements OnInit {

  userSession: SessionInterface;
  disDetails: DiscountInterface = null;
  disId;

  //adding status
  stillUpdatingDiscount: boolean = false;
  stillDeletingDiscount: boolean = false;

  updated: boolean = false;

  disForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    percent: new FormControl('', [Validators.required, PercentValidator.isPercentInvalid])
  });

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private disService: DiscountService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );

    this.route.paramMap.subscribe(params => {
      this.disId = params.get('disId');
    });

    this.populateDetails();
  }

  back() {
    if (this.disForm.touched && !this.updated) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/discounts']);
      }
    } else {
      this.router.navigate(['/menu/discounts']);
    }
  }

  populateDetails () {    
    this.disService.viewDiscountDetail(this.disId).then(response => {
      if (response['data'] != null) {
        this.disDetails = <DiscountInterface>response['data'][0];

        this.intializeForm();
      } else {
        alert(ErrorHandling.showError(response));
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  intializeForm() {
    if (this.disDetails != null) {
      this.nameInput.setValue(this.disDetails.disName);
      this.percentInput.setValue(this.disDetails.disPercent);
    }
  }

  updateDiscount() {
    if (confirm('Are you sure you want to update this discount?')) {
      this.stillUpdatingDiscount = true;
      const discount = {
        disName: this.nameInput.value,
        disPercent: this.percentInput.value,
        disModifiedBy: this.userSession.userId,
        disModifiedOn: new Date(),
        disId: this.disDetails.disId
      }
      this.disService.updateDiscount(discount).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.updated = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillUpdatingDiscount = false;
      });
    }
  }

  deleteDiscount() {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.stillDeletingDiscount = true;
      const discount = {
        disModifiedBy: this.userSession.userId,
        disModifiedOn: new Date(),
        disId: this.disDetails.disId
      }
      this.disService.deleteDiscount(discount).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          this.router.navigate(["/menu/discounts"]);
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillDeletingDiscount = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.nameInput.setValue('');
      this.percentInput.setValue('');
    }
  }

  get nameInput() {
    return this.disForm.get('name');
  }

  get percentInput() {
    return this.disForm.get('percent');
  }

}
