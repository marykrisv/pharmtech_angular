import { AuthGuard } from './auth/auth.guard';
import { InventoryModule } from './inventory/inventory.module';
import { UsersModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuviewComponent } from './menuview/menuview.component';
import { EprescriptionComponent } from './eprescription/eprescription.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HttpClientModule }    from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuviewComponent,
    EprescriptionComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    DashboardModule,
    UsersModule,
    InventoryModule,
    LoginModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
