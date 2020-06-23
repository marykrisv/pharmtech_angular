import { InventoryGuard } from './guard/inventory.guard';
import { DashboardGuard } from './guard/dashboard.guard';
import { UserService } from './services/user.service';
import { PrivilegeService } from './services/privilege.service';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/auth/auth.service';
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
import { UserGuard } from './guard/user.guard';

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
  providers: [
    AuthGuard,
    DashboardGuard,
    AuthService,
    DataService,
    PrivilegeService,
    UserService,
    DashboardGuard,
    UserGuard,
    InventoryGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
