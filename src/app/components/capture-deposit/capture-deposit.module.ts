import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { CaptureDepositRoutingModule } from './capture-deposit-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

import { AuthService } from '../../services/auth.service';

/* Sub components */
import { CaptureDepositComponent } from './capture-deposit.component';
import { SelectCardComponent } from './select-card/select-card.component';
import { ViewScannedImagesComponent } from './view-scanned-images/view-scanned-images.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { AddCardComponent } from './add-card/add-card.component';

@NgModule({
  declarations: [
    CaptureDepositComponent,
    SelectCardComponent, 
    ViewScannedImagesComponent, 
    ListCardsComponent, 
    AddCardComponent
  ],
  imports: [
    CommonModule,
    CaptureDepositRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [ 
    AuthService 
  ],
})
export class CaptureDepositModule { }
