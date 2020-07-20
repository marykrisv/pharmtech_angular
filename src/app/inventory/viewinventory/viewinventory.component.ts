import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/interface/ProductInterface';
import { SessionInterface } from 'src/app/interface/session.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ErrorHandling } from 'src/app/common/error-handling';

@Component({
  selector: 'app-viewinventory',
  templateUrl: './viewinventory.component.html',
  styleUrls: ['./viewinventory.component.scss']
})
export class ViewinventoryComponent implements OnInit {

  products: ProductInterface[] = null;
  userSession: SessionInterface;

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
    search: new FormControl(this.filterBy)
  });

  constructor(
    private auth: AuthService,
    private prodService: ProductService
  ) { }

  ngOnInit(): void {
    this.auth.currentSession.subscribe(currentSession => {
      this.userSession = currentSession;
    });

    this.viewAllProduct();
  }

  viewAllProduct () {
    this.prodService.viewAllProduct().then(response => {
      this.populateProduct(response);
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

}
