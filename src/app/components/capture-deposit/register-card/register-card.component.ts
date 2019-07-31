import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalVariable } from '../../../shared/global';
import { MatSnackBar } from '@angular/material';
import { Card, DepositService } from '../../../services/deposit.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

  /* Forms */
  formGroup: FormGroup;

  /* Data Objects */
  card: Card = {
    id: null,
    cardNumber: '',
    name: '',
    locationId: '',
    accountId: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar, 
    private formBuilder: FormBuilder,
    private depositService: DepositService
  ) { }

  ngOnInit() {
      this.formGroup = this.formBuilder.group({
        cardNumber: ['', [
          Validators.required,
          Validators.pattern(GlobalVariable.CARD_REGEX)
        ]],
        cardName: ['',  Validators.required],
        locationId: ['',  Validators.required],
        accountId: ['',  Validators.required]
      });
      this.route.queryParams.subscribe(params => {
          if(params['cardNumber'] != null) {
              this.formGroup.get('cardNumber').setValue(params['cardNumber']); 
          }
      });
  }

  onSaveClick(): void{
    if(!this.formGroup.valid) {
      this.snackBar.open('Please enter all information! You can still create the deposit without card registration!', 'ERROR', {
          duration: 1000,
      });
      return;
    }
    const cardNumberStripped = this.formGroup.get('cardNumber').value;
    this.card.cardNumber = cardNumberStripped.replace(/-/g, '');
    this.card.name = this.formGroup.get('cardName').value;
    this.card.locationId = this.formGroup.get('locationId').value;
    this.card.accountId = this.formGroup.get('accountId').value;
    this.depositService.saveCard(this.card);
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
