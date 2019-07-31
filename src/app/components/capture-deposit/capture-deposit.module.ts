/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { CaptureDepositRoutingModule } from './capture-deposit-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

/* Services */
import { AuthService } from '../../services/auth.service';
import { DepositService } from '../../services/deposit.service';

/* Sub Components */
import { CaptureDepositComponent } from './capture-deposit.component';
import { SelectCardComponent } from './select-card/select-card.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { RegisterCardComponent } from './register-card/register-card.component';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';

@NgModule({
  declarations: [
    CaptureDepositComponent,
    SelectCardComponent,  
    ListCardsComponent, 
    RegisterCardComponent, 
    ViewReceiptComponent
  ],
  imports: [
    CommonModule,
    CaptureDepositRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [ 
    AuthService, 
    DepositService
  ],
})
export class CaptureDepositModule { }
