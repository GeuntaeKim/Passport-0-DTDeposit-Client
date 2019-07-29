import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { GlobalVariable } from '../shared/global';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class User {
  constructor(
      public id:number,
      public name:string) {
  }
}

export class UserService {
  BASE_URL = GlobalVariable.BASE_API_URL;
  FETCH_LATENCY = GlobalVariable.FETCH_LATENCY;

  private userListStore;
  private userListSubject: Subject<User[]> = new Subject();
  users =  this.userListSubject.asObservable();

  private userStore;
  private userSubject: Subject<User> = new Subject();
  user =  this.userSubject.asObservable();

  constructor(private http:HttpClient, private sb: MatSnackBar) {
      this.user.subscribe();
  }

  login(id: String, password: String) {
      var authInfo;

      authInfo = {
          token: "AAAA",
          name: id
      };
      
      return authInfo;
  }

  private handleError(error) {
      console.error(error);
      this.sb.open(error, 'close', { duration: 2000 });
  }
}