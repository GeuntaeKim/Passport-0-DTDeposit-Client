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
  
  /* Material Components */
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  /* UI Components */
  frontImage: any;
  rearImage: any;

  /* Data Objects */
  isRegistered: boolean = false;
  cardOptions: string[];
  cardFilteredOptions: Observable<string[]>;
  isFrontImageLoading: boolean = true;
  isRearImageLoading: boolean = true;
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
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      cardNumber: ['', [
        Validators.required,
        Validators.pattern(GlobalVariable.CARD_REGEX)
      ]]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
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

  async getFrontImage() {
    this.isFrontImageLoading = true;
    console.log('test');
    await this.depositService.getItem(4)
    .then(results => {
      console.log('from service');
      console.log(results);
      this.createImageFromBlob(results);
      //this.createImageFromBlob(results);
      this.isFrontImageLoading = false;
    }), error => {
      this.isFrontImageLoading = false;
      console.log(error);
    };

  }

  onClearClick(): void {
    this.firstFormGroup.get('cardNumber').setValue('');
    this.isRegistered = false;
  }

  onCardNumberChange(): void {
    this.isRegistered = false;
  }

  onCardSelect(): void {
    this.isRegistered = true;
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
    this.getFrontImage();
  }

  onSaveClick(): void {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cardOptions.filter(cardOptions => cardOptions.toLowerCase().indexOf(filterValue) === 0);
  }

}
