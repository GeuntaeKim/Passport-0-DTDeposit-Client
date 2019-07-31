/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { PushDepositRoutingModule } from './push-deposit-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

/* Services */
import { AuthService } from '../../services/auth.service';
import { DepositService } from '../../services/deposit.service';

/* Sub Components */
import { PushDepositComponent } from './push-deposit.component';
import { ListDepositsComponent }  from './list-deposits/list-deposits.component';

@NgModule({
  declarations: [
    PushDepositComponent,
    ListDepositsComponent
  ],
  imports: [
    CommonModule,
    PushDepositRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [ 
    AuthService, 
    DepositService
  ],
})
export class PushDepositModule { }
