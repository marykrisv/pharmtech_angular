import { DataService } from './../data.service';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menuview',
  templateUrl: './menuview.component.html',
  styleUrls: ['./menuview.component.scss']
})
export class MenuviewComponent implements OnInit {

  constructor(private data: DataService) {    
  }

  ngOnInit(): void {
    
  }
}
