import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CaptureDepositComponent } from './components/capture-deposit/capture-deposit.component'
import { PushDepositComponent } from './components/push-deposit/push-deposit.component'

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'capture',
    component: CaptureDepositComponent
  },
  {
    path: 'push',
    component: PushDepositComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
