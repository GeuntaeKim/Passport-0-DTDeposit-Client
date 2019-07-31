import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalVariable } from '../../../shared/global';
import { MatSnackBar } from '@angular/material';
import { Deposit, Item, Card, DepositService } from '../../../services/deposit.service';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {

  /* Forms */
  formGroup: FormGroup;

  /* Data Objects */
  deposit: Deposit = {
      id: null,
      locationId: '',
      accountId: '',
      amount: '',
      status: 0,
      cardId: 0
  };
  item: Item = {
      id: null,
      amount: '',
      micr: '',
      frontImage: '',
      rearImage: '',
      depositId: null
  };
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
    this.route.queryParams.subscribe(params => {
        if(params['depositId'] != null) {
          console.log('test');
          this.depositService.deposit.subscribe(deposit => this.deposit = <Deposit> deposit[0]);
          this.depositService.getDeposit(params['depositId']);
        } else {
            this.snackBar.open('Unexpected page navigation is detected! Going to main page.', 'ERROR', {
                duration: 1000,
            });
            this.router.navigate(['/capture'], {relativeTo: this.route});
        }
        console.log(params);
        if(params['itemId'] != null) {
          this.depositService.item.subscribe(item => this.item = <Item> item[0]);
          this.depositService.getItem(params['itemId']);
        }

        if(params['cardId'] != null) {

          
          this.depositService.card1.subscribe(card => this.card = <Card> card[0]);
          this.depositService.getCard1(params['cardId']);
        }

    });
  }

}
