import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule }         from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:      [ CommonModule, FormsModule ],
  providers:    [ DatePipe ],
})
export class SharedModule { }
