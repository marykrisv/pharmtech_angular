import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userMenu: string;

  constructor() { 
    this.userMenu = 'viewAll';

    console.log(this.userMenu);
  }

  goToAddView() {
    this.userMenu = 'add';
  }

  goToViewAll() {
    this.userMenu = 'viewAll';
  }

  ngOnInit(): void {
  }

}
