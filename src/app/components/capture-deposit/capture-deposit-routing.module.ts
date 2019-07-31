import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaptureDepositComponent } from './capture-deposit.component';
import { SelectCardComponent } from './select-card/select-card.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { RegisterCardComponent } from './register-card/register-card.component';

const routes: Routes = [{
  path: '',
  component: CaptureDepositComponent,
  children: [
      { 
          path: '',
          component: SelectCardComponent
      },
      {
          path: 'list',
          component: ListCardsComponent
      },
      {
          path: 'new',
          component: RegisterCardComponent
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptureDepositRoutingModule { }
