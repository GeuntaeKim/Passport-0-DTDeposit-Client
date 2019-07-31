import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoadingService } from '../../../services/loading.service';
import { MatSnackBar } from '@angular/material';
import { GlobalVariable } from '../../../shared/global';
import { DepositService, Card, Deposit, Item } from '../../../services/deposit.service';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.css']
})
export class SelectCardComponent implements OnInit {
  loading = false;
  /* Material Components */
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  /* UI Components */
  frontImage: any;
  rearImage: any;

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
  }
  card: Card;
  registeredCard: Card;
  isRegistered: boolean = false;
  cardOptions: string[];
  cardFilteredOptions: Observable<string[]>;
  isFrontImageLoading: boolean = true;
  isRearImageLoading: boolean = true;
  showProgressLoading: boolean = false;
  base64data;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar, 
    private loadingService: LoadingService,
    private depositService: DepositService
  ) { }

  ngOnInit() {
    this.loading=true;
    this.firstFormGroup = this.formBuilder.group({
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(GlobalVariable.CARD_REGEX)
      ]]
    });
    this.secondFormGroup = this.formBuilder.group({
    });
    this.thirdFormGroup = this.formBuilder.group({
      amount: ['', [
        Validators.required
      ]]
    });
    this.loadCardList();
  }

  async loadCardList() {
    await this.depositService.getCardList()
    .then(results => {
      if (this.cardOptions == null) {
        this.cardOptions = [];
      }
      results.forEach(card => {
        this.cardOptions.push(
          card.cardNumber.toString().substring(0, 4) + "-" +
          card.cardNumber.toString().substring(4, 8) + "-" +
          card.cardNumber.toString().substring(8, 12) + "-" +
          card.cardNumber.toString().substring(12, 16)
          );
      });
    })
    .then(() => {
      this.cardFilteredOptions = this.firstFormGroup.get('cardNumber').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  async getCard(id: string){
    await this.depositService.getCard(id)
    .then(results => {
      this.card = <Card> results[0];
    }), error => {
      console.log(error);
    };
  }

  async getCardByNumber(cardNumber: string){
    await this.depositService.getCardByNumber(cardNumber)
    .then(results => {
      this.registeredCard = <Card> results;
    }), error => {
      console.log(error);
    };
  }

  async getImage() {
    this.isFrontImageLoading = true;
    this.isRearImageLoading = true;
    await this.depositService.getImage(4)
    .then(results => {
      console.log('from service');
      console.log(results);
      this.createImageFromBlob(results);
      //this.createImageFromBlob(results);
      this.isFrontImageLoading = false;
      this.isRearImageLoading = false;
    }), error => {
      this.isFrontImageLoading = false;
      this.isRearImageLoading = false;
      console.log(error);
    };

    this.showProgressLoading = false;
  }

  getCardNumber(): string {
    return this.firstFormGroup.get('cardNumber').value;
  }
  
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result);
      var base64result = reader.result.toString().split(',')[1];
      console.log(base64result);
      this.frontImage = base64result;
    }, false);

    if (image) {
      //reader.readAsArrayBuffer(image);
      reader.readAsDataURL(image);
    }
    /* onload and onloadend does give same info 
    reader.onload = function(e) {
      console.log('onload')
      console.log(reader.result);
    }
    reader.onloadend = function() {
      console.log('onloadend')
      console.log(reader.result);
    }
    */
  }

  createImageFromURL(image: string) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log(reader.result);
      var base64result = reader.result.toString().split(',')[1];
      console.log(base64result);
      this.frontImage = base64result;
    }, false);

    if (image) {
      //reader.readAsDataURL(image);
    }
    reader.onload = function(e) {
      console.log('onload')
      console.log(reader.result);
    }
    reader.onloadend = function() {
      console.log('onloadend')
      console.log(reader.result);
    }
  }

  onClearClick(): void {
    this.firstFormGroup.get('cardNumber').setValue('');
    this.isRegistered = false;
    this.registeredCard = undefined;
  }

  onCardNumberChange(): void {
    this.isRegistered = false;
    this.registeredCard = undefined;
  }

  onCardSelect(): void {
    this.isRegistered = true;
    var registeredCardNumber = this.firstFormGroup.get('cardNumber').value.replace(/-/g, '');
    this.getCardByNumber(registeredCardNumber);
  }

  onRegisterClick(): void {
    if (this.firstFormGroup.get('cardNumber').value == ''){
      this.snackBar.open('Please enter Card information!', 'ERROR', {
          duration: 1000,
      });
      return;
    }

    this.router.navigate(['register'], {
      queryParams: { cardNumber: this.firstFormGroup.get('cardNumber').value }, 
      relativeTo: this.route} 
    );
  }

  onCaptureClick(): void {
    this.showProgressLoading = true;
    this.getImage();
  }

  onSaveClick(): void {
    if(!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid) {
      this.snackBar.open('Please make sure all neccessary information is provided!', 'ERROR', {
          duration: 1000,
      });
      return;
    }

    // deposit info
    this.deposit.locationId = '';
    this.deposit.accountId = '';
    if (this.isRegistered) {
      console.log(this.registeredCard)
      this.deposit.locationId = this.registeredCard.locationId;
      this.deposit.accountId = this.registeredCard.accountId;
      this.deposit.status = 1;
    }
    this.deposit.amount = this.thirdFormGroup.get('amount').value;

    // item info (temp)
    this.item.amount = this.deposit.amount;
    this.item.micr = 'd141000011d0701140c 5716';
    this.item.frontImage = this.frontImage;
    this.item.rearImage = this.rearImage;
    this.item.depositId = this.deposit.id;



    var return_value = false; 
    this.depositService.saveDeposit(this.deposit)
    .then(results => {
      console.log('get result from save deposit');
      console.log(results);
      if (results != null && results.status == 1) {
        this.deposit.id = results.id;
        return_value = true;
      }
    })
    .then(async() => {
      await this.depositService.saveItem(this.item)
      .then(results => {
        if (results != null && results.status == 1) {
          this.item.id = results.id;
          return_value = true;
        }
      })
    })
    .then(() => {
      if(!return_value) {
        this.snackBar.open('Unexpected error occurred!', 'ERROR', {
            duration: 1000,
        });
        return;
      } else {
        this.router.navigate(['receipt'], {
          queryParams: { 
            depositId: this.deposit.id,
            //itemId: this.item.id,
            //cardId: this.card.id 
          }, 
          relativeTo: this.route} 
        );
      }
    });
  }

  async saveDepositAndItem() {
    var return_value = false; 
    await this.depositService.saveDeposit(this.deposit)
    .then(results => {
      console.log('get result from save deposit');
      console.log(results);
      if (results != null && results.status == 1) {
        this.deposit.id = results.id;
        return_value = true;
      }
    })
    .then(async() => {
      console.log('going somewhere')
      await this.depositService.saveItem(this.item)
      .then(results => {
        if (results != null && results.status == 1) {
          this.item.id = results.id;
          return_value = true;
        }
      })
    });
    return return_value;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cardOptions.filter(cardOptions => cardOptions.toLowerCase().indexOf(filterValue) === 0);
  }

}
