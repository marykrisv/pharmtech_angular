import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.scss']
})
export class MenuviewComponent implements OnInit {
  @Input()
  private _menuSelected: string;
  // @Output()
  // change = new EventEmitter();

  public get menuSelected(): string {
    return this._menuSelected;
  }
  public set menuSelected(value: string) {
    this._menuSelected = value;
  }

  constructor() {
    this._menuSelected = 'users';
  }

  ngOnInit(): void {
  }

  menuSelectedOnChange () {
    console.log(this._menuSelected);
  }
}
