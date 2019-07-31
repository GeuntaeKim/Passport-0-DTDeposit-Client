import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PushDepositComponent } from './push-deposit.component';
import { ListDepositsComponent } from './list-deposits/list-deposits.component';

const routes: Routes = [{
  path: '',
  component: PushDepositComponent,
  children: [
      { 
          path: '',
          component: ListDepositsComponent
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushDepositRoutingModule { }
