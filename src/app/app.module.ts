import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './common/nav/nav.component';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { WebServices } from './shared/web.service';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { UserComponent } from './component/user/user.component';
import { DepositComponent } from './component/deposit/deposit.component'
import { UserService } from './component/user/user.service';
import { DepositService } from './component/deposit/deposit.service';
import { DepositListComponent } from './component/deposit/deposit-list.component';
import { CaptureDepositComponent } from './components/capture-deposit/capture-deposit.component';
import { PushDepositComponent } from './components/push-deposit/push-deposit.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    DepositComponent,
    DepositListComponent,
    CaptureDepositComponent,
    PushDepositComponent,
    NavigationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    WebServices, 
    AuthService,
    UserService,
    DepositService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
