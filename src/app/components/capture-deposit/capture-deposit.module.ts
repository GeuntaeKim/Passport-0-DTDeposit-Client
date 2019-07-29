import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaptureDepositRoutingModule } from './capture-deposit-routing.module';

@NgModule({
  declarations: [ShowDepositComponent],
  imports: [
    CommonModule,
    CaptureDepositRoutingModule
  ]
})
export class CaptureDepositModule { }
