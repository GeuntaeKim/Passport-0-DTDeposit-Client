import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Components */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CaptureDepositComponent } from './components/capture-deposit/capture-deposit.component';
import { PushDepositComponent } from './components/push-deposit/push-deposit.component';

/* Modules */
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';

/* Services */
import { AuthService } from './services/auth.service';
import { WebServices } from './services/web.service';
import { UserService } from './services/user.service';
import { DepositService } from './services/deposit.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    CaptureDepositComponent,
    PushDepositComponent
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
    AuthService,
    WebServices, 
    UserService,
    DepositService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
