import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

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
    loadChildren: () => import('./components/capture-deposit/capture-deposit.module').then(mod => mod.CaptureDepositModule)
  },
  {
    path: 'push',
    loadChildren: () => import('./components/push-deposit/push-deposit.module').then(mod => mod.PushDepositModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
