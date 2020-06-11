import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pharmtech';
}

document.body.onclick = function(e) {
  var element_sidewrapper = document.getElementById("sidebar-wrapper");
  var element_wrapper = document.getElementById("wrapper");
  var element_dropdown = document.getElementById("dropdownMenu");
  var screenWidth = window.innerWidth;
  if (screenWidth <= 767) {
    if(e.target != element_sidewrapper) {
      //outside      
      if (!element_wrapper.classList.contains("active")) {
        element_wrapper.classList.toggle("active");        
      }       
    } else {
      //inside
        // alert('You clicked inside');
    }
  }
  if (e.target != element_dropdown) {
    //outside      
    if (!element_dropdown.classList.contains("collapse")) {
      element_dropdown.classList.toggle("collapse");        
    } 
  }
  
}
