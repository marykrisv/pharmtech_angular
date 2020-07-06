import { PercentValidator } from './../../validators/percent.validator';
import { Component, OnInit } from '@angular/core';
import { SessionInterface } from 'src/app/interface/session.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DiscountService } from 'src/app/services/discount.service';
import { Router } from '@angular/router';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-adddiscount',
  templateUrl: './adddiscount.component.html',
  styleUrls: ['./adddiscount.component.scss']
})
export class AdddiscountComponent implements OnInit {

  userSession: SessionInterface;

  //adding status
  stillCreatingDiscount: boolean = false;

  added: boolean = false;

  disForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    percent: new FormControl('', [Validators.required, PercentValidator.isPercentInvalid])
  });

  constructor(
    private auth: AuthService,
    private disService: DiscountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  back() {
    if (this.disForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/discounts']);
      }
    } else {
      this.router.navigate(['/menu/discounts']);
    }
  }

  addNewDiscount() {
    if (confirm('Are you sure you want to save this discount?')) {
      this.stillCreatingDiscount = true;
      const discount = {
        disName: this.nameInput.value,
        disPercent: this.percentInput.value,
        disCreatedBy: this.userSession.userId
      }
      this.disService.createNewDiscount(discount).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      }).finally(() => {
        this.stillCreatingDiscount = false;
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
