import { DecimalValidator } from './../../validators/decimal.validator';
import { IntegerValidator } from './../../validators/integer.validator';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ManufacturerInterface } from 'src/app/interface/manufacturer.interface';
import { UomInterface } from 'src/app/interface/uom.interface';
import { DosageInterface } from 'src/app/interface/dosage.interface';
import { RestrictionInterface } from 'src/app/interface/restriction.interface';
import { StrengthInterface } from 'src/app/interface/strength.interface';
import { ConcentrationInterface } from 'src/app/interface/concentration.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { UomService } from 'src/app/services/uom.service';
import { DosageService } from 'src/app/services/dosage.service';
import { RestrictionService } from 'src/app/services/restriction.service';
import { StrengthService } from 'src/app/services/strength.service';
import { ConcentrationService } from 'src/app/services/concentration.service';
import { ErrorHandling } from 'src/app/common/error-handling';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SessionInterface } from 'src/app/interface/session.interface';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  prodImage: any = "http://placehold.it/180";
  isMedicine = false;
  stillCreatingProduct = false;
  added = false;

  userSession: SessionInterface;

  manufacturers: ManufacturerInterface[];
  uoms: UomInterface[];
  dosageForms: DosageInterface[];
  restrictions: RestrictionInterface[];
  strengths: StrengthInterface[];
  concentrations: ConcentrationInterface[];

  prodForm = new FormGroup({
    isMedicine: new FormControl(false),
    prodImage: new FormControl(''),
    itemcode: new FormControl('', Validators.required),
    binLocation: new FormControl('', Validators.required),
    genericName: new FormControl(''),
    brandName: new FormControl('', Validators.required),
    manufacturer: new FormControl(''),
    uom: new FormControl(''),
    parlevel: new FormControl('', [Validators.required, IntegerValidator.isInteger]),
    price: new FormControl('', [Validators.required, DecimalValidator.isDecimal]),
    consignment: new FormControl('', Validators.required),
    dosageForm: new FormControl({value: '', disabled: !this.isMedicine}),
    restriction: new FormControl({value: '', disabled: !this.isMedicine}),
    str: new FormControl({value: '', disabled: !this.isMedicine}, DecimalValidator.isDecimal),
    strength: new FormControl({value: '', disabled: !this.isMedicine}),
    con: new FormControl({value: '', disabled: !this.isMedicine}, DecimalValidator.isDecimal),
    concentration: new FormControl({value: '', disabled: !this.isMedicine}),
    description: new FormControl(''),
    counselling: new FormControl({value: '', disabled: !this.isMedicine}),
    auxiliary: new FormControl({value: '', disabled: !this.isMedicine}),
    drugInfo: new FormControl({value: '', disabled: !this.isMedicine}),
    drugInteraction: new FormControl({value: '', disabled: !this.isMedicine}),
  });

  constructor(
    private manService: ManufacturerService,
    private uomService: UomService,
    private dosService: DosageService,
    private resService: RestrictionService,
    private strService: StrengthService,
    private conService: ConcentrationService,
    private prodService: ProductService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.populateManufacturer();
    this.populateUom();
    this.populateDosageForm();
    this.populatRestriction();
    this.populateStrength();
    this.populateConcentration();

    this.auth.currentSession.subscribe(
      currentSession => this.userSession = currentSession
    );
  }

  openFileBrowser() {
    document.getElementById("pic").click();
  }

  updateIsMedicine() {
    if (this.isMedicine) {
      if (confirm('Are you sure you want to turn this product to non-medicine?\nNOTE: All information about medicine will be deleted.')) {
        this.isMedicine = this.isMedicineInput.value;
        if (this.isMedicine) {
          this.enableMedInfo();
        } else {
          this.disableMedInfo();
        }
      } else {
        this.isMedicineInput.setValue(true);
      }
    } else {
      this.isMedicine = this.isMedicineInput.value;
      if (this.isMedicine) {
        this.enableMedInfo();
      } else {
        this.disableMedInfo();
      }
    }        
  }

  private enableMedInfo() {
    this.dosageFormInput.enable();
    this.restrictionInput.enable();
    this.strInput.enable();
    this.strengthInput.enable();
    this.conInput.enable();
    this.concentrationInput.enable();
    this.counsellingInput.enable();
    this.auxiliaryInput.enable();
    this.drugInfoInput.enable();
    this.drugInteractionInput.enable();
  }

  private disableMedInfo() {
    this.dosageFormInput.disable();
    this.restrictionInput.disable();
    this.strInput.disable();
    this.strengthInput.disable();
    this.conInput.disable();
    this.concentrationInput.disable();
    this.counsellingInput.disable();
    this.auxiliaryInput.disable();
    this.drugInfoInput.disable();
    this.drugInteractionInput.disable();

    //delete medicine information
    this.dosageFormInput.setValue('');
    this.restrictionInput.setValue('');
    this.strInput.setValue('');
    this.strengthInput.setValue('');
    this.conInput.setValue('');
    this.concentrationInput.setValue('');
    this.counsellingInput.setValue('');
    this.auxiliaryInput.setValue('');
    this.drugInfoInput.setValue('');
    this.drugInteractionInput.setValue('');
  }

  browsePreview(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.prodImage = e.target.result;        
        // console.log(e.target);
      }
      // console.log(input.files[0]);
      reader.readAsDataURL(input.files[0]);
    }
  }

  browsePreview1(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.prodImage = e.target.result;
        // console.log(reader.result);
        
        console.log(URL.createObjectURL(input.files[0]));
      }
      // console.log(input.files[0]);
      reader.readAsDataURL(input.files[0]);
    }
  }

  populateManufacturer() {
    this.manService.viewAllManufacturer().then(response => {
      if (response['data'] != undefined) {
        this.manufacturers = <ManufacturerInterface[]> response['data'];
      } else {
        this.manufacturers = null;
      }
    });
  }

  populateUom() {
    this.uomService.viewAllUom().then(response => {
      if (response['data'] != undefined) {
        this.uoms = <UomInterface[]> response['data'];
      } else {
        this.uoms = null;
      }
    });
  }

  populateDosageForm() {
    this.dosService.viewAllDosage().then(response => {
      if (response['data'] != undefined) {
        this.dosageForms = <DosageInterface[]> response['data'];
      } else {
        this.dosageForms = null;
      }
    });
  }

  populatRestriction() {
    this.resService.viewAllRestriction().then(response => {
      if (response['data'] != undefined) {
        this.restrictions = <RestrictionInterface[]> response['data'];
      } else {
        this.restrictions = null;
      }
    });
  }

  populateStrength() {
    this.strService.viewAllStrength().then(response => {
      if (response['data'] != undefined) {
        this.strengths = <StrengthInterface[]> response['data'];
      } else {
        this.strengths = null;
      }
    });
  }

  populateConcentration() {
    this.conService.viewAllConcentration().then(response => {
      if (response['data'] != undefined) {
        this.concentrations = <ConcentrationInterface[]> response['data'];
      } else {
        this.concentrations = null;
      }
    });
  }

  back() {
    if (this.prodForm.touched && !this.added) {
      if (confirm('Are you sure you want to leave?')) {
        this.router.navigate(['/menu/inventory']);
      }
    } else {
      this.router.navigate(['/menu/inventory']);
    }
  }

  addNewProduct() {
    if (confirm('Are you sure you want to save this product?')) {
      this.stillCreatingProduct = true;
      const product = {
        prodItemcode: this.itemcodeInput.value,
        prodBinLocation: this.binLocationInput.value,
        prodGenericName: this.genericNameInput.value,
        prodBrandName: this.brandNameInput.value,
        prodDosId: this.dosageFormInput.value,
        prodStrengthAmount: this.strInput.value,
        prodStrId: this.strengthInput.value,
        prodConcentrationAmount: this.conInput.value,
        prodConId: this.concentrationInput.value,
        prodManId: this.manufacturerInput.value,
        prodResId: this.restrictionInput.value,
        prodUomId: this.uomInput.value,
        prodDescription: this.descriptionInput.value,
        prodCounselling: this.counsellingInput.value,
        prodAuxiliary: this.auxiliaryInput.value,
        prodDrugInfo: this.drugInfoInput.value,
        prodDrugInteraction: this.drugInteractionInput.value,
        prodParLevel: this.parlevelInput.value,
        prodStockStatus: this.consignmentInput.value,
        prodImageName: this.prodImage,
        prodStatus: 1,
        prodIsMedicine: this.isMedicine,
        prodCreatedBy: this.userSession.userId,
        prodPrice: this.priceInput.value
      }
      console.log(this.prodImage);
      this.prodService.createNewProduct(product).then(response => {
        if (response['success'] == true) {
          alert(response['message']);

          this.added = true;
        } else {
          alert(ErrorHandling.showError(response));
        }        
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
        console.log(response);
      }).finally(() => {
        this.stillCreatingProduct = false;
      });
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all?')) {
      this.isMedicineInput.setValue(false);

      this.prodImageInput.setValue('');
      this.itemcodeInput.setValue('');
      this.binLocationInput.setValue('');
      this.parlevelInput.setValue('');
      this.consignmentInput.setValue('');
      this.genericNameInput.setValue('');
      this.brandNameInput.setValue('');
      this.manufacturerInput.setValue('');
      this.uomInput.setValue('');
      this.descriptionInput.setValue('');

      this.dosageFormInput.setValue('');
      this.restrictionInput.setValue('');
      this.strInput.setValue('');
      this.strengthInput.setValue('');
      this.conInput.setValue('');
      this.concentrationInput.setValue('');
      this.counsellingInput.setValue('');
      this.auxiliaryInput.setValue('');
      this.drugInfoInput.setValue('');
      this.drugInteractionInput.setValue('');

      this.updateIsMedicine();
    }
  }

  get isMedicineInput() {
    return this.prodForm.get('isMedicine');
  }

  get prodImageInput() {
    return this.prodForm.get("prodImage");
  }

  get itemcodeInput() {
    return this.prodForm.get("itemcode");
  }

  get binLocationInput() {
    return this.prodForm.get("binLocation");
  }

  get genericNameInput() {
    return this.prodForm.get("genericName");
  }

  get brandNameInput() {
    return this.prodForm.get("brandName");
  }

  get manufacturerInput() {
    return this.prodForm.get("manufacturer");
  }

  get uomInput() {
    return this.prodForm.get("uom");
  }

  get parlevelInput() {
    return this.prodForm.get("parlevel");
  }

  get consignmentInput() {
    return this.prodForm.get("consignment");
  }

  get dosageFormInput() {
    return this.prodForm.get("dosageForm");
  }

  get restrictionInput() {
    return this.prodForm.get("restriction");
  }

  get strInput() {
    return this.prodForm.get("str");
  }

  get strengthInput() {
    return this.prodForm.get("strength");
  }

  get conInput() {
    return this.prodForm.get("con");
  }

  get concentrationInput() {
    return this.prodForm.get("concentration");
  }

  get descriptionInput() {
    return this.prodForm.get("description");
  }

  get counsellingInput() {
    return this.prodForm.get("counselling");
  }

  get auxiliaryInput() {
    return this.prodForm.get("auxiliary");
  }

  get drugInfoInput () {
    return this.prodForm.get("drugInfo");
  }

  get drugInteractionInput () {
    return this.prodForm.get("drugInteraction");
  }

  get priceInput() {
    return this.prodForm.get("price");
  }

}
