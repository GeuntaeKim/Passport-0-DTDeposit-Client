import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-capture-deposit',
  templateUrl: './capture-deposit.component.html',
  styleUrls: ['./capture-deposit.component.css']
})
export class CaptureDepositComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { 
    if (!authService.isAuthenticated) this.router.navigate(['/']);
  }

  ngOnInit() {
    console.log('loaded');
  }

}
