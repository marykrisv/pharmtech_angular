import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuviewComponent } from './menuview/menuview.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EprescriptionComponent } from './eprescription/eprescription.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule }    from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuviewComponent,
    InventoryComponent,
    EprescriptionComponent,
    SideMenuComponent,
    UserComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
