import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.body.onclick = function(e) {
  var element_sidewrapper = document.getElementById("sidebar-wrapper");
  var element_wrapper = document.getElementById("wrapper");
  var screenWidth = window.innerWidth;
  if (screenWidth <= 767) {
    console.log("inside");
    if(e.target != element_sidewrapper) {
      //outside      
      if (!element_sidewrapper.classList.contains("inactive")) {
        console.log("super inside");
        element_sidewrapper.classList.toggle("inactive");
        element_wrapper.classList.remove("active");        
      } 
      
    } else {
      //inside
        alert('You clicked inside');
    }
  }
  
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
