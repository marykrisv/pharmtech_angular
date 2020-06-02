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

  onClick (_menuSelected) {
    this.menuSelected = _menuSelected;
    console.log(_menuSelected);
  }
}
