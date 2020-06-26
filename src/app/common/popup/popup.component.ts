import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {
  }

  openModal () {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }


  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
}
