import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewinventory',
  templateUrl: './viewinventory.component.html',
  styleUrls: ['./viewinventory.component.scss']
})
export class ViewinventoryComponent implements OnInit {

  prodImage: any = "http://placehold.it/180";

  prodForm = new FormGroup({
    prodImage: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  openFileBrowser() {
    document.getElementById("pic").click();
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

  get prodImageInput() {
    return this.prodForm.get("prodImage");
  }

}
