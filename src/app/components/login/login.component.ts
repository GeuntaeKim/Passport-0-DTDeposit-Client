import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loadingSubscription: Subscription;

  id = new FormControl('', [
    Validators.required,
    //Validators.pattern(GlobalVariable.EMAIL_REGEX)
  ]);

  password = new FormControl('', [
      Validators.required
  ]);

  constructor(public snackBar: MatSnackBar, private authService: AuthService, private loadingService: LoadingService) { }

  async login() {

      this.loadingSubscription = this.loadingService.loadingStatus.subscribe((value) => {
        this.loading = value;
      });

      this.markAllAsDirty();

      if(!this.isValid()) {
          this.snackBar.open('Please enter valid information!', 'ERROR', {
              duration: 1000,
          });
          return;
      } else {
          var isLogin = await this.authService.login(this.id.value, this.password.value);
          if (!isLogin){
            this.snackBar.open('Authentication Failed!', 'ERROR', {
              duration: 1000,
            });
            return;
          }
      }

      this.loadingSubscription.unsubscribe();
  }

  markAllAsDirty() {
      this.id.markAsDirty({ onlySelf: true });
      this.password.markAsDirty({ onlySelf: true });
  }

  isValid() {
      return this.id.valid && this.password.valid;
  }

  ngOnInit() {
  }

}
