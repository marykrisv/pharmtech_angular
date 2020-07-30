import { ConcentrationService } from './../../services/concentration.service';
import { ConcentrationInterface } from './../../interface/concentration.interface';
import { StrengthInterface } from './../../interface/strength.interface';
import { StrengthService } from './../../services/strength.service';
import { RestrictionInterface } from './../../interface/restriction.interface';
import { RestrictionService } from './../../services/restriction.service';
import { DosageService } from './../../services/dosage.service';
import { DosageInterface } from './../../interface/dosage.interface';
import { UomService } from './../../services/uom.service';
import { ManufacturerService } from './../../services/manufacturer.service';
import { ManufacturerInterface } from './../../interface/manufacturer.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UomInterface } from 'src/app/interface/uom.interface';

@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.scss']
})
export class AddinventoryComponent implements OnInit {

  prodImage: any = "http://placehold.it/180";

  isMedicine = false;

  manufacturers: ManufacturerInterface[];
  uoms: UomInterface[];
  dosageForms: DosageInterface[];
  restrictions: RestrictionInterface[];
  strengths: StrengthInterface[];
  concentrations: ConcentrationInterface[];

  prodForm = new FormGroup({
    prodImage: new FormControl(''),
    itemcode: new FormControl('', Validators.required),
    binLocation: new FormControl('', Validators.required),
    genericName: new FormControl(''),
    brandName: new FormControl('', Validators.required),
    manufacturer: new FormControl(''),
    uom: new FormControl(''),
    parlevel: new FormControl('', Validators.required),
    consignment: new FormControl('', Validators.required),
    dosageForm: new FormControl({value: '', disabled: !this.isMedicine}),
    restriction: new FormControl({value: '', disabled: !this.isMedicine}),
    str: new FormControl({value: '', disabled: !this.isMedicine}),
    strength: new FormControl({value: '', disabled: !this.isMedicine}),
    con: new FormControl({value: '', disabled: !this.isMedicine}),
    concentration: new FormControl({value: '', disabled: !this.isMedicine}),
    description: new FormControl(''),
    counselling: new FormControl({value: '', disabled: !this.isMedicine}),
    auxiliary: new FormControl({value: '', disabled: !this.isMedicine}),
  });

  constructor(
    private manService: ManufacturerService,
    private uomService: UomService,
    private dosService: DosageService,
    private resService: RestrictionService,
    private strService: StrengthService,
    private conService: ConcentrationService
  ) { }

  ngOnInit(): void {
    this.populateManufacturer();
    this.populateUom();
    this.populateDosageForm();
    this.populatRestriction();
    this.populateStrength();
    this.populateConcentration();
  }

  openFileBrowser() {
    document.getElementById("pic").click();
  }

  updateIsMedicine() {
    this.isMedicine = !this.isMedicine;
    if (this.isMedicine) {
      this.dosageFormInput.enable();
      this.restrictionInput.enable();
      this.strInput.enable();
      this.strengthInput.enable();
      this.conInput.enable();
      this.concentrationInput.enable();
      this.counsellingInput.enable();
      this.auxiliaryInput.enable();
    } else {
      this.dosageFormInput.disable();
      this.restrictionInput.disable();
      this.strInput.disable();
      this.strengthInput.disable();
      this.conInput.disable();
      this.concentrationInput.disable();
      this.counsellingInput.disable();
      this.auxiliaryInput.disable();
    }
  }

  browsePreview(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.prodImage = e.target.result;
      }
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
    this.conService.viewAllConcentration().subscribe(response => {
      if (response['data'] != undefined) {
        this.concentrations = <ConcentrationInterface[]> response['data'];
      } else {
        this.concentrations = null;
      }
    })
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

}
