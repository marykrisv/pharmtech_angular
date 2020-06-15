import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuSelected: string;

  constructor() { }

  ngOnInit(): void {
  }

  showDropDown ($event) {
    $event.stopPropagation();
    var element = document.getElementById("dropdownMenu");
    element.classList.toggle("collapse");
  }

  openSideMenu ($event) {
    $event.stopPropagation();
    var element_wrapper = document.getElementById("wrapper");
    element_wrapper.classList.toggle("active");

    // var element_modalscreen = document.getElementById("modal-screen");
    // var screenWidth = window.innerWidth;
    // if (screenWidth <= 767) {
    //   if (!element_wrapper.classList.contains("active")) {
    //     element_modalscreen.style.display = "block";
    //   }
    // }
  }
}
