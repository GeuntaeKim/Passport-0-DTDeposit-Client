import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.css']
})
export class SelectCardComponent implements OnInit {
  
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  
  cardNumber = new FormControl();
  options: string[] = ['1234567812345678', '22222222222222222', '3333333333333333'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    console.log('select card');
    this.filteredOptions = this.cardNumber.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
