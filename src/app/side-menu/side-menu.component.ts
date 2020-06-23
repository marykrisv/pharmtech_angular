import { MenuviewComponent } from './../menuview/menuview.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Privilege } from '../interface/privilege.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  screenWidth = window.innerWidth;
  userPrivilege: Privilege;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentUserPrivilege.subscribe(currentUserPrivilege => 
      this.userPrivilege = currentUserPrivilege
    );
  }

  openSubmenu ($event) {
    $event.stopPropagation();
    var element = document.getElementById("others");
    element.classList.toggle("collapse");
  }
}
