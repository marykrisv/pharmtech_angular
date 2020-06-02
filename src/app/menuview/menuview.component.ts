import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.scss']
})
export class MenuviewComponent implements OnInit {
  @Input() menuSelected: string;

  constructor() { }

  ngOnInit(): void {
  }

}

enum MenuList {
  Inventory,
  Eprescription
}
