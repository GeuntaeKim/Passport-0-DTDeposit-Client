import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../shared/auth.service';
import { GlobalVariable } from '../../shared/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private authService: AuthService) { }

  id = new FormControl('', [
      Validators.required,
      //Validators.pattern(GlobalVariable.EMAIL_REGEX)
  ]);

  password = new FormControl('', [
      Validators.required
  ]);

  login() {
      this.markAllAsDirty();

      if(!this.isValid()) {
          this.snackBar.open('Please enter valid information!', 'ERROR', {
              duration: 1000,
          });
          return;
      } else {
          if (!this.authService.login(this.id.value, this.password.value)){
            this.snackBar.open('Authentication Failed!', 'ERROR', {
              duration: 1000,
            });
            return;
          }

      }
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
