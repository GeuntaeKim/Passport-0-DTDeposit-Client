import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { GlobalVariable } from '../shared/global';
import { User, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  BASE_URL = GlobalVariable.BASE_API_URL;
  NAME_KEY = 'name';
  TOKEN_KEY = 'token'
  
  user: User

  constructor(private http: Http, private router: Router, private userService: UserService) { }

  get name() {
      return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
      return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
      var header = new Headers({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
      return new RequestOptions({ headers: header});
  }

  async login(id, password) {
    var authInfo;
    authInfo = await this.userService.login(id, password);

    return this.authenticate(authInfo);
  }

  logout() {
      localStorage.removeItem(this.NAME_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
      this.router.navigate(['/']);
  }

  authenticate(res) {
      var authResponse = res;
      if (authResponse == undefined || !authResponse.token){
        return false;
      }


      localStorage.setItem(this.TOKEN_KEY, authResponse.token)
      localStorage.setItem(this.NAME_KEY, authResponse.name)
      this.router.navigate(['/capture']);

      return true;
  }
}
