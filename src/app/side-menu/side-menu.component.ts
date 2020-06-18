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
  curActivePos: number;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    // this.data.currentMenuSelected.subscribe(menuSelected => this.menuSelected = menuSelected);
    this.curActivePos = 0;
    this.selectMenu("users", 0);
  }

  selectMenu (selected, pos) {  
    var list = document.getElementsByTagName("ul")[0]; //get element ul for the menu

    //remove the active class
    list.getElementsByTagName("li")[this.curActivePos].classList.remove("active");
    
    //add active class to the active li
    list.getElementsByTagName("li")[pos].classList.add("active");
    
    //set for the menu select
    this.curActivePos = pos;
    this.data.changeMenuSelected(selected);
  }  

  openSubmenu ($event) {
    $event.stopPropagation();
    var element = document.getElementById("others");
    element.classList.toggle("collapse");
  }
}
