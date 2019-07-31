import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  // below will be needed when cor is set in backend
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    })
  };

  private userListStore;
  private userListSubject: Subject<User[]> = new Subject();
  users =  this.userListSubject.asObservable();

  private userStore;
  private userSubject: Subject<User> = new Subject();
  user =  this.userSubject.asObservable();

  constructor(private http:HttpClient, private sb: MatSnackBar) {
      this.user.subscribe();
  }

  async login(id: String, password: String) {
    var authInfo;
    var response;
    
    try {
        response = await this.http.get(this.BASE_URL + '/users/' +id).toPromise();
    } catch (error) {
        console.log(error)
        this.handleError("Unable to login");
    }

    /* TODO Actual authentication is required for now just check userid */ 
    //if (response != null && response.status == 1){
    if (response != null && response[0] != null){
        authInfo = {
            token: "AAAA",
            name: response[0].userid
        };
    }
    return authInfo;
  }

  private handleError(error) {
      console.error(error);
      this.sb.open(error, 'close', { duration: 2000 });
  }
}