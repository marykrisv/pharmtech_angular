import { DataService } from './../data.service';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.scss']
})
export class MenuviewComponent implements OnInit {
  menuSelected: string;

  constructor(private data: DataService) {    
  }

  ngOnInit(): void {
    this.data.currentMenuSelected.subscribe(menuSelected => this.menuSelected = menuSelected)
  }
}
