import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interface/product.interface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ErrorHandling } from 'src/app/common/error-handling';
import { LocationInterface } from 'src/app/interface/location.interface';
import { LocationService } from 'src/app/services/location.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-viewinventory',
  templateUrl: './viewinventory.component.html',
  styleUrls: ['./viewinventory.component.scss']
})
export class ViewinventoryComponent implements OnInit {

  products: ProductInterface[] = null;
  locations: LocationInterface[];
  userSession: SessionInterface;

  totalInventory: TotalInventoryPerLocation[];

  totalProdCount: number;

  loading: boolean = false;

  prodSearchInput: string = null;

  filterBy: string = "";

  filterByList = [
    {
      filterString: 'Abr: ',
      sqlSearch: 'prodAbr'
    },
    {
      filterString: 'Name: ',
      sqlSearch: 'prodName'
    }
  ]

  options = new FormGroup({
    search: new FormControl(),
    // search: new FormControl(this.filterBy, SearchValidator.isSearchUserInvalid),
    location: new FormControl('All'),
    status: new FormControl('All')
  });

  constructor(
    private auth: AuthService,
    private prodService: ProductService,    
    private locService: LocationService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });
    
    // this.viewAllProduct();
    this.populateLocations();
    this.locationInput.setValue(this.userSession.userLocId);
    this.viewAllProduct();
  }

  viewAllProduct () {
    this.prodService.viewAllProduct().then(response => {
      this.populateProduct(response);
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateLocations() {
    this.locService.viewAllLocation().then(response => {
      if (response['data']) {
        this.locations = <LocationInterface[]>response['data'];
      } else {
        this.locations = null;
      }
    }).catch(response => {
      alert("Connection Problem. Please check your internet.");
    });
  }

  populateProduct(response) {
    this.loading = true;
    if (response['data'] != undefined) {
      this.products = <ProductInterface[]>response['data'];
      this.totalProdCount = response['data'][0]['total'];
    } else {
      this.products = null;
      this.totalProdCount = 0;
      // alert(ErrorHandling.showError(response));
    }
    this.loading = false;
  }

  populateInventory() {    
    this.locations.forEach(location => {
      this.prodService.viewInventoryPerLocation(location.locId).then(response => {
        
      });
    });
  }

  initializeAllLocationInventory() {    
    var totalInventoryPerLocation = this.initTotalInventoryPerLocation();
    this.products.forEach(prod => {
      prod.totalInv = totalInventoryPerLocation;
    });
  }

  initTotalInventoryPerLocation() {
    var loc = this.locationInput.value;
    var numOfLocations = this.locations.length;
    var totalInv: number[] = [];

    if (loc !='All') {
      numOfLocations = 1;
    }    
    
    for (var i = 0; i < numOfLocations; i++) {
      totalInv.push(0);
    }

    return totalInv;
  }

  filterByLocation () {
    this.initializeAllLocationInventory();
    console.log(this.products);
  }

  changeFilterBy (filterBy: string) {
    // var prevFilterBy = this.filterBy;
    // this.filterBy = filterBy+": ";
    // if (this.searchInput.invalid) {
    //   this.searchInput.setValue(this.filterBy);
    // } else {
    //   this.locationSearchInput = this.searchInput.value.toString().trim();
    //   this.locationSearchInput = this.locationSearchInput.substr(prevFilterBy.length, this.locationSearchInput.length);

    //   if (this.locationSearchInput != null) {
    //     this.searchInput.setValue(this.filterBy+this.locationSearchInput);
    //   }
    // }   
  }

  search() {

  }

  removeFilter() {
    // this.locationSearchInput = null;
    // this.filterBy = "";
    // this.searchInput.setValue(this.filterBy);
    // this.viewAllLocation();
  }

  deleteProduct (prodId) {
    if (confirm('Are you sure you want to delete this product?')) {
      const product = {
        prodId: prodId,
        prodModifiedOn: new Date(),
        prodModifiedBy: this.userSession.userId
      }
      this.prodService.deleteProduct(product).then(response => {
        if (response['success'] == true) {
          alert(response['message']);
          
          //delete row
          this.deleteRow(prodId);

        } else {
          alert(ErrorHandling.showError(response));
        }
      }).catch(response => {
        alert("Connection Problem. Please check your internet.");
      });
    }
  }

  deleteRow (prodId) {
    for(let i = 0; i < this.products.length; ++i){
      if (this.products[i].prodId === prodId) {
          this.products.splice(i,1);
          this.totalProdCount--;
          break;
      }
    }
  }

  get searchInput () {
    return this.options.get('search');
  }

  get statusInput () {
    return this.options.get('status');
  }

  get locationInput () {
    return this.options.get('location');
  }

}

interface TotalInventoryPerLocation {
  locId: number,
  totalInvs: number[]
}