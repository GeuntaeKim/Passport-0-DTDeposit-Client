import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Headers, ResponseType, ResponseContentType } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { GlobalVariable } from '../shared/global';


@Injectable({
  providedIn: 'root'
})

export class Card {
  constructor(
      public id:number,
      public cardNumber:number,
      public name:string
      ) {
  }
}

export class Deposit {
  constructor(
      public id:number,
      public localtionid:string,
      public accountid:string,
      public amount:string,
      public status:number,
      public cardid:number
      ) {
  }
}

export class Item {
  constructor(
      public id:number,
      public amount:string,
      public micr:string,
      public frontImage:string,
      public rearImage:string
      ) {
  }
}

export class DepositService {
  BASE_URL = GlobalVariable.BASE_API_URL;

  private cardsStore;
  private cardsSubject: Subject<Card> = new Subject();
  cards = this.cardsSubject.asObservable();

  private cardStore;
  private cardSubject: Subject<Card> = new Subject();
  card = this.cardSubject.asObservable();

  cardList: Card[];
  item: Item;

  frontImage: Blob;

  constructor(private http:Http, private sb: MatSnackBar) { 
    this.card.subscribe();
  }

  async getCards(): Promise<Card[]> {
    var response;
    
    try {
        response = await this.http.get(this.BASE_URL + '/cards').toPromise();
    } catch (error) {
        console.log(error)
        this.handleError("Unable to get the card list information");
    }

    return response;
  }

  getCardList() {
    this.cardList = [];
    return new Promise<Card[]>(resolve =>{
      setTimeout(() => { 
          this.http.get(this.BASE_URL+ '/cards').subscribe(response => {
              response.json().forEach(node => {
                  this.cardList.push(<Card>node);
              });
              resolve(this.cardList); 
          }, error => {
              this.handleError("Unable to get the card list information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
  }

  getCard(id: number | string) {
    this.http.get(this.BASE_URL + '/cards?id=' + id).subscribe(response => {
        this.cardStore = <Card> response.json();
        this.cardSubject.next(this.cardStore);
    }, error => {
        this.handleError("Unable to get the card information");
    });
  }

  getItem(id: number | string) {
    return new Promise<Blob>(resolve =>{
      setTimeout(() => { 
          const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          });
          this.http.get(this.BASE_URL + '/items/4', {headers: headers, responseType: ResponseContentType.Blob}).subscribe(response => {
              this.frontImage = <Blob> response.json();
              console.log('frontImage');
              console.log(this.frontImage);
              resolve(this.frontImage); 
          }, error => {
              this.handleError("Unable to get the card list information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
  }

  private handleError(error) {
    console.error(error);
    this.sb.open(error, 'close', { duration: 2000 });
  }
}
