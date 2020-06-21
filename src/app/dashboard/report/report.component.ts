import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  tests = ['test1', 'test2'];

  constructor() { }

  ngOnInit(): void {
  }

}
