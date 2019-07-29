import { Component, ViewEncapsulation } from '@angular/core';
import { NavComponent } from './common/nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Deposit Capture On-Premise';
  
}
