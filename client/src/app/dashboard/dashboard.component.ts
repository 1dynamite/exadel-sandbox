import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User | undefined;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }

  ngOnInit(): void {
    const myObserver = {
      next: (res: User) => {
        this.user = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigateByUrl('/login');
      },
    };

    if (!this.user) this.dashboardService.getUser().subscribe(myObserver);
  }

  logout(): void {
    localStorage.clear();
  }
}
