import { MenuviewComponent } from './../menuview/menuview.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  screenWidth = window.innerWidth;
  menuSelected: string;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMenuSelected.subscribe(menuSelected => this.menuSelected = menuSelected)
  }

  selectMenu (selected) {
    this.data.changeMenuSelected(selected);
  }

  openSubmenu ($event) {
    $event.stopPropagation();
    var element = document.getElementById("others");
    element.classList.toggle("collapse");
  }
}
