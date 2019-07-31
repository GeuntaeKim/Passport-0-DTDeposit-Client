import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../shared/global';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

  /* Forms */
  cardNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(GlobalVariable.CARD_REGEX)
  ]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          if(params['cardNumber'] != null) {
              this.cardNumber.setValue(params['cardNumber']); 
          }
      });
  }

}
