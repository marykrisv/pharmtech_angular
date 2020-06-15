import { MenuviewComponent } from './../menuview/menuview.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  screenWidth = window.innerWidth;
  mc = new MenuviewComponent();
  constructor() { }

  ngOnInit(): void {
  }

  selectMenu (selected) {
    // this.mc.menuSelected = selected;
  }

  openSubmenu ($event) {
    $event.stopPropagation();
    var element = document.getElementById("others");
    element.classList.toggle("collapse");
  }
}
