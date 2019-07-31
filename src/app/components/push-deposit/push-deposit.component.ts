import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DepositService } from 'src/app/services/deposit.service';

@Component({
  selector: 'app-push-deposit',
  templateUrl: './push-deposit.component.html',
  styleUrls: ['./push-deposit.component.css']
})
export class PushDepositComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { 
    if (!authService.isAuthenticated) this.router.navigate(['/']);
  }

  ngOnInit() {
    
  }

}
