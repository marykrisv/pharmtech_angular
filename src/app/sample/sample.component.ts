import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  ngOnInit(): void {
  }

  test ($event) {
    $event.stopPropagation();
    var element = document.getElementById("wrapper");
    element.classList.toggle("active");
    
    document.getElementById("sidebar-wrapper").classList.remove("inactive");
  }
}
