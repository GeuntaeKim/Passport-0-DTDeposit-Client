import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Headers, RequestOptions, ResponseType, ResponseContentType } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { GlobalVariable } from '../shared/global';


@Injectable({
  providedIn: 'root'
})

export class ActionResult {
  constructor(
    public id:number,
    public status:number,
    ) {
}
};

export class Card {
  constructor(
      public id:number,
      public cardNumber:string,
      public name:string,
      public locationId:string,
      public accountId:string
      ) {
  }
}

export class Deposit {
  constructor(
      public id:number,
      public locationId:string,
      public accountId:string,
      public amount:string,
      public status:number,
      public cardId:number
      ) {
  }
}

export class Item {
  constructor(
      public id:number,
      public amount:string,
      public micr:string,
      public frontImage:string,
      public rearImage:string,
      public depositId:number
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
  card1 = this.cardSubject.asObservable();
  
  private depositStore;
  private depositSubject: Subject<Deposit> = new Subject();
  deposit = this.depositSubject.asObservable();

  private itemStore;
  private itemSubject: Subject<Item> = new Subject();
  item = this.itemSubject.asObservable();

  cardList: Card[];
  card: Card;

  frontImage: Blob;
  actionResult: ActionResult;

  json_headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://153.71.108.86:4200'
  });

  security_hearders = new Headers({
    'Access-Control-Allow-Origin': '*'
  })

  constructor(private http:Http, private sb: MatSnackBar) { 
    this.card1.subscribe();
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
    return new Promise<Card>(resolve =>{
      setTimeout(() => { 
          this.http.get(this.BASE_URL + '/card/'+id, {headers: this.json_headers, responseType: ResponseContentType.Blob}).subscribe(response => { 
            this.card = <Card> response.json();
              resolve(this.card); 
          }, error => {
              this.handleError("Unable to get the card information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
  }

  getCard1(id: number | string) {
    this.http.get(this.BASE_URL + '/cards?id=' + id).subscribe(response => {
      console.log(response);
        this.cardStore = <Card> response.json();
        this.cardSubject.next(this.cardStore);
        
    }, error => {
        this.handleError("Unable to get the card information");
    });
}

  getDeposit(id: number | string) {
      this.http.get(this.BASE_URL + '/deposits?id=' + id).subscribe(response => {
        console.log(response);
          this.depositStore = <Deposit> response.json();
          this.depositSubject.next(this.depositStore);
          
      }, error => {
          this.handleError("Unable to get the deposit information");
      });
  }

  getItem(id: number | string) {
    this.http.get(this.BASE_URL + '/items?id=' + id).subscribe(response => {
        this.itemStore = <Item> response.json();
        this.itemSubject.next(this.itemStore);
    }, error => {
        this.handleError("Unable to get selected employer");
    });
  }

  getCardByNumber(cardNumber: string) {
    return new Promise<Card>(resolve =>{
      setTimeout(() => { 
          this.http.post(this.BASE_URL + '/cards/findByCardNumber?cardNumber='+cardNumber, {headers: this.json_headers}).subscribe(response => { 
            var res = response.json();
            this.card = <Card> res.card[0]
            resolve(this.card);
          }, error => {
              this.handleError("Unable to get the card information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
  }

  async saveCard(card: Card){
      var response; 
      try {
          let body = JSON.stringify(card);
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: this.json_headers });

          var result = await this.http.post(this.BASE_URL + '/cards/add', body, options).toPromise();
          response = result.json()
      } catch (error) {
          console.log(error)
          this.handleError("Unable to save the card");
      }
      return response;
  }

  saveDeposit(deposit: Deposit) {
    return new Promise<any>(resolve =>{
      setTimeout(() => { 
          let body = JSON.stringify(deposit);
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          this.http.post(this.BASE_URL + '/deposits/add', {headers: this.json_headers, responseType: ResponseContentType.Blob}).subscribe(response => { 
            this.actionResult = response.json();
            resolve(this.actionResult); 
          }, error => {
              this.handleError("Unable to get the deposit information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
  }

  saveItem(item: Item) {
    return new Promise<any>(resolve =>{
      setTimeout(() => { 
          let body = JSON.stringify(item);
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          this.http.post(this.BASE_URL + '/items/add', {headers: this.json_headers, responseType: ResponseContentType.Blob}).subscribe(response => { 
            var res = response.json();
            console.log('saveItem');
            console.log(res);
            this.actionResult.id = res.id;
            this.actionResult.status = res.status;
            resolve(this.actionResult); 
          }, error => {
              this.handleError("Unable to get the item information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
  }

  getImage(id: number | string) {
    return new Promise<Blob>(resolve =>{
      setTimeout(() => { 
          let body = [];
          let options = new RequestOptions({ headers: this.json_headers, responseType: ResponseContentType.Blob });

          this.http.post(this.BASE_URL + '/items/image?id=4', body, options).subscribe(response => {
            console.log(response);  
            this.frontImage = <Blob> response.json();
              console.log('frontImage');
              console.log(this.frontImage);
              resolve(this.frontImage); 
          }, error => {
              this.handleError("Unable to get the image information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
    /* Seems workd but failing due to 431 Large Hearder Size -> looks like problem of using get */
    /*
    return new Promise<Blob>(resolve =>{
      setTimeout(() => { 
          console.log('start')
          this.http.get(this.BASE_URL + '/items/4', {headers: this.json_headers, responseType: ResponseContentType.Blob}).subscribe(response => {
            console.log(response);  
            this.frontImage = <Blob> response.json();
              console.log('frontImage');
              console.log(this.frontImage);
              resolve(this.frontImage); 
          }, error => {
              this.handleError("Unable to get the image information");
          });
        } , GlobalVariable.FETCH_LATENCY);
    });
    */
  }

  private handleError(error) {
    console.error(error);
    this.sb.open(error, 'close', { duration: 2000 });
  }
}
