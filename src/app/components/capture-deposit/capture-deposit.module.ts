import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptureDepositComponent } from './capture-deposit.component';
import { CaptureDepositRoutingModule } from './capture-deposit-routing.module';

@NgModule({
  declarations: [CaptureDepositComponent],
  imports: [
    CommonModule,
    CaptureDepositRoutingModule
  ]
})
export class CaptureDepositModule { }
