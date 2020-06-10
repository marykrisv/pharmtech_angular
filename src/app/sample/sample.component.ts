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
    var element_wrapper = document.getElementById("wrapper");
    element_wrapper.classList.toggle("active");
  }
}
