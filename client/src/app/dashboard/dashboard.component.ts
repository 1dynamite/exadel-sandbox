import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    const myObserver = {
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigateByUrl('/login');
      },
    };

    if (!this.user) this.dashboardService.getUser().subscribe(myObserver);
  }

  logout() {
    localStorage.clear();
  }
}
