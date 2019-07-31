import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServices {

  constructor(private http:HttpClient) {}

  getMessages() {
      return this.http.get('http://localhost:1234/messages').toPromise();
  }
}
